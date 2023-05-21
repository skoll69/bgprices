import { ApiHandler } from "sst/node/api";
import { jsonResponse } from "./utils";

const SHOPS = [
  'fantasiapelit',
  'lautapelit',
  // 'pelipeikko',
  // 'philibertnet',
]

export const handler = ApiHandler(async (_evt) => {
  return jsonResponse(SHOPS)
});
