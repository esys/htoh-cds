/**
 * Type for URI query string parameters
 */
export type QueryStringParameters = { [key: string]: string };

/**
 * Utility to execute a promise of HTTP response and deliver the payload as JSON.
 * If HTTP call is not ok, throws an error
 * @param promise HTTP request promise, typically from a fetch function
 */
export async function getJSON<T>(promise: Promise<Response>): Promise<T> {
  const response = await promise;
  if (!response.ok) {
    throw new Error(`Got error ${response.status} for url ${response.url}`);
  }
  return await response.json();
}
