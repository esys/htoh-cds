import cdsToken from "../../../config/cds.token.local.json";
import { getLogger } from "../../../config/logging";

const logger = getLogger("CdsApi");

enum CdsResources {
  CDS_AUTHENTICATE = "Authenticate",
  CDS_SEARCH = "hotelSearch",
}

enum CdsMethod {
  GET = "GET",
}

export enum CdsCurrency {
  EUR = "EUR",
}

export enum CdsLanguage {
  FR = "FR",
}

export enum CdsRadiusMeasure {
  K = "K",
}

export default class CdsApi {
  static Token: string | null;
  static AgentDutyCode: string | null;

  private buildUrl(apiResource: CdsResources, params: { [key: string]: string } | null = null) {
    let url = `${cdsToken.url}/${apiResource}`;
    if (params) {
      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
      url += `?${queryString}`;
    }
    return url;
  }

  private authorize() {
    const url = this.buildUrl(CdsResources.CDS_AUTHENTICATE);
    const { login, password } = cdsToken;
    if (!login || !password) {
      throw new Error("CDS.authorize cannot read login/password from config");
    }
    const data = {
      Username: login,
      Password: password,
    };
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`CDS.authorize got error ${response.status}`);
      }
      return response.json();
    });
  }

  private async doAuthorizeIfRequired() {
    if (CdsApi.Token && CdsApi.AgentDutyCode) {
      return;
    }
    try {
      let authResp = await this.authorize();
      CdsApi.Token = authResp.Token;
      CdsApi.AgentDutyCode = authResp.AgentDutyCode;
    } catch (error) {
      throw new Error(`CDS.doAuthorizeIfRequired failed due to authentication error ${error.message}`);
    }
  }

  private async callApi(
    apiResource: CdsResources,
    params: { [key: string]: string } | null,
    method: CdsMethod = CdsMethod.GET
  ) {
    this.doAuthorizeIfRequired();
    const url = this.buildUrl(apiResource, params);
    logger.debug(`callApi url=${url}`);

    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${CdsApi.Token}`,
        Accept: "*/*",
      },
    });
  }

  async search(
    latitude: string,
    longitude: string,
    radius: number,
    checkin: string,
    checkout: string,
    guest: number = 1,
    room: number = 1,
    currency: CdsCurrency = CdsCurrency.EUR,
    language: CdsLanguage = CdsLanguage.FR,
    radiusMeasure: CdsRadiusMeasure = CdsRadiusMeasure.K
  ) {
    // need the agentDutyCode as a parameter, so call authentication now
    await this.doAuthorizeIfRequired();

    const params = {
      agentDutyCode: CdsApi.AgentDutyCode as string,
      currency: currency.toString(),
      language: language.toString(),
      latitude,
      longitude,
      radius: radius.toString(),
      radiusMeasure: radiusMeasure.toString(),
      checkin,
      checkout,
      guest: guest.toString(),
      room: room.toString(),
    };
    return this.callApi(CdsResources.CDS_SEARCH, params);
  }
}
