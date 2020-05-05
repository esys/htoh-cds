/**
 * Type for URI query string parameters
 */
export type QueryStringParameters = { [key: string]: string };

/**
 * Utility to unwrap a promise of HTTP response and deliver the payload as JSON.
 * If HTTP call is not ok, throws an error
 * @param promise HTTP call promise, typically from a fetch function
 */
export async function getPayload<T>(promise: Promise<Response>): Promise<T> {
  const response = await promise;
  if (response.ok) {
    return (await response.json()) as Promise<T>;
  } else {
    throw new Error(`Got error ${response.status} for url ${response.url}`);
  }
}
