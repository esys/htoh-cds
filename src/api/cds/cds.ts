import cdsToken from "../../../config/cds.token.local.json";
import { getLogger } from "../../../config/logging";
import { QueryStringParameters } from "../common";

const logger = getLogger("CdsApi");

enum CdsResources {
  CDS_AUTHENTICATE = "Authenticate",
  CDS_SEARCH = "hotelSearch",
}

enum CdsMethod {
  GET = "GET",
}

enum YesNo {
  YES = "Yes",
  NO = "No",
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

export interface PagedResponse {
  NumberOfResult: number;
  CurrentPage: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
  PreviousPage: YesNo;
  NextPage: YesNo;
}

export interface SearchResponse extends PagedResponse {
  Hotels: Hotel[];
  MaxPrice: number;
  MinPrice: number;
}

export type Hotel = {
  HtlId: number;
  HtlCd: string;
  HtlName: string;
  HtlAddress1: string;
  HtlCity: string;
  HtlStars: number;
  Distance: number;
  HtlLongitude: number;
  HtlLatitude: number;
  ImageUrl: string;
  RoomRateList: RoomRate[];
  HotelInfoList: HotelInfo[];
  RoomAmenityList: RoomAmenity[];
  ImageInfoList: ImageInfo[];
  ScoreBookingCom?: string;
  NbrReviewBookingCom?: number;
  HealthyAndSafetyRating?: string;
};

export type RoomRate = {
  RatCd: string;
  CurCd: string; // country local currency, e.g. JPY
  RatPrice: number;
  OtherCurrency: OtherCurrency;
  TotalPricePerRoom: number;
  TotalPricePerStay: number;
  RatName: string;
  RatDesc: string;
  RoomImagesList: string[];
  IncludedFeatures: string[];
  CancellationPolicyDate: string;
  CancelPenaltyList: string[];
  RatBreakfast: boolean;
  RatLunch: boolean;
  RatDiner: boolean;
  IsCancellable: boolean;
};

export type OtherCurrency = {
  CurCd: string;
  RatPrice: number;
  TaxPrice: number;
  RatMealPrice: number;
  RoomPrice: number;
  TotalPricePerRoom: number;
  TotalPricePerStay: number;
};

export type HotelInfo = {
  OtaType: string;
  OtaCd: number;
  OtaCode: OtaCode;
};

export type OtaCode = {
  OtaName: string;
  OtaName2: string;
};

export type RoomAmenity = {
  OtaType: string;
  OtaCd: number;
  OtaCode: OtaCode;
};

export type ImageInfo = {
  ImgFile: string;
};

export default class CdsApi {
  static Token: string | null;
  static AgentDutyCode: string | null;

  private buildUrl(apiResource: CdsResources, params: QueryStringParameters | null = null) {
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
    params: QueryStringParameters | null,
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
    latitude: number,
    longitude: number,
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
      latitude: latitude.toString(),
      longitude: longitude.toString(),
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
