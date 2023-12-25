import { parse } from "url";
import http, { RequestOptions } from "http";
import https from "https";

const isReachableUrl = (
  url: string,
  timeout: number = 2000,
  requestOptions?: RequestOptions
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { host, protocol, pathname } = parse(url);

    if (!host) {
      reject({ statusCode: 500 });
    }

    const isHttps = protocol === "https:";

    const options: RequestOptions = {
      host,
      timeout,
      method: "HEAD",
      path: pathname,
      port: isHttps ? 443 : 80,
      ...requestOptions,
    };

    const network = isHttps ? https : http;

    const req = network.request(options, (res) => {
      const { headers, } = res;
      const statusCode = res.statusCode ?? 404;
      const isStatusOk = statusCode < 400;

      if (isStatusOk) {
        return resolve({ statusCode: res.statusCode, headers });
      }

      resolve({ statusCode: 500 });
    });

    req.end();

    req.on("timeout", () => {
      resolve({ statusCode: 500 });
    });

    req.on("error", (err) => {
      resolve({ statusCode: 500 });
    });
  });
};


export default isReachableUrl;
isReachableUrl.isReachable = ({ statusCode }) => statusCode >= 200 && statusCode < 400

