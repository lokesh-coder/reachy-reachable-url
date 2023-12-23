import { RequestOptions } from "https";
import reachableUrl from "reachy-url";

const isReachableUrl = (
  url: string,
  timeout: number = 2000,
  requestOptions?: RequestOptions
): Promise<{ statusCode: number }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await reachableUrl(url, timeout, requestOptions)
      resolve({ statusCode: Number(res) });
    } catch (error) {
      resolve({ statusCode: 500 })
    }
  });
};

export default isReachableUrl;
isReachableUrl.isReachable = ({ statusCode }) => statusCode >= 200 && statusCode < 400

