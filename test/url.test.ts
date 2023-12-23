import app from "./setupServer";
import isReachableUrl, { isReachable } from "../index";
import { beforeAll, expect, test } from "vitest";

const makeURL = (path: string) => {
  return isReachableUrl(`http://localhost/${path}`, 20, { port: 6969 });
};

beforeAll(() => {
  app.listen(6969);
});


test("URL should be reachable", async () => {
  await expect(makeURL("reachable")).resolves.toEqual({ statusCode: 200 });
  await expect(isReachable(await makeURL(`reachable`))).toEqual(true);
});

test("URL should be unreachable", async () => {
  await expect(makeURL("unreachable")).resolves.toEqual({ statusCode: 500 });
  await expect(isReachable(await makeURL(`unreachable`))).toEqual(false);
});
test("URL should timeout", async () => {
  await expect(makeURL("timeout")).resolves.toEqual({ statusCode: 500 });
  await expect(isReachable(await makeURL(`timeout`))).toEqual(false);
});
test("URL should be invalid", async () => {
  await expect(makeURL("http:")).resolves.toEqual({ statusCode: 500 });
  await expect(isReachable(await makeURL(`http:`))).toEqual(false);
});
