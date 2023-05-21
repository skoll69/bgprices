import { ApiHandler } from "sst/node/api";
import { query as fantasiapelitQuery } from "./parsers/fantasiapelit"
import { query as lautapelitQuery } from "./parsers/lautapelit"
import { jsonResponse } from "./utils";

export const fantasiapelit = ApiHandler(async (evt) => {
  const qs = evt.queryStringParameters?.['q']
  if (!qs) {
    return jsonResponse([]);
  }
  const res = await fantasiapelitQuery(qs)
  return jsonResponse(res)
});

export const lautapelit = ApiHandler(async (evt) => {
  const qs = evt.queryStringParameters?.['q']
  if (!qs) {
    return jsonResponse([]);
  }
  const res = await lautapelitQuery(qs)
  return jsonResponse(res)
});
