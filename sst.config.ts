import { SSTConfig } from "sst";
import { API } from "./stacks/Backend";
import { Static } from "./stacks/Static";

export default {
  config(_input) {
    return {
      name: "bgprices-sst",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(API);
    app.stack(Static);
  }
} satisfies SSTConfig;
