import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /query/fantasiapelit": "packages/functions/src/controller.fantasiapelit",
      "GET /query/lautapelit": "packages/functions/src/controller.lautapelit",
      "GET /shops": "packages/functions/src/shops.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    apiEndpoint: api.url,
  }
}
