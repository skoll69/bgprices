import { StackContext, use, StaticSite } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { API } from "./Backend";

const CERT_ARN = 'arn:aws:acm:us-east-1:020614016459:certificate/5b25dbf5-1d52-4184-8dcb-2565205b9a03'

export function Static({ stack }: StackContext) {
  const { apiEndpoint } = use(API)
  
  const web = new StaticSite(stack, "web", {
    path: "packages/client",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    environment: {
      VITE_APP_API_URL: apiEndpoint,
    },
    customDomain: {
      isExternalDomain: true,
      domainName: 'bgprices2.skoll.xyz',
      cdk: {
        certificate: Certificate.fromCertificateArn(stack, 'cert', CERT_ARN)
      }
    },
  })
}
