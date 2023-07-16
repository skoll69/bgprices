import { ApiHandler } from "sst/node/api";
import { query as fantasiapelitQuery } from "./parsers/fantasiapelit"
import { query as lautapelitQuery } from "./parsers/lautapelit"
import { query as philibertQuery } from "./parsers/philibert"
import { query as pelipeikkoQuery } from "./parsers/pelipeikko"
import { jsonResponse } from "./utils";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const fantasiapelit = ApiHandler(async (evt) => {
  return await handleResponse(evt, fantasiapelitQuery)
});

export const pelipeikko = ApiHandler(async (evt) => {
  return await handleResponse(evt, pelipeikkoQuery)
});

export const philibert = ApiHandler(async (evt) => {
  return await handleResponse(evt, philibertQuery)
});

export const lautapelit = ApiHandler(async (evt) => {
  return await handleResponse(evt, lautapelitQuery)
});

async function handleResponse(evt: APIGatewayProxyEventV2, handler: Function) {
  const qs = evt.queryStringParameters?.['q']
  if (!qs) {
    return jsonResponse([]);
  }
  const res = await handler(qs)
  return jsonResponse(res)
}