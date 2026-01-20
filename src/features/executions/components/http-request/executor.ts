import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

// type HttpsRequestData = Record<string, unknown>; //previous
type HttpsRequestData = {
  variableName?:string;
  endpoint?:string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
}

export const httpRequestExecutor: NodeExecutor<HttpsRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  if(!data.variableName){
    throw new NonRetriableError("Variable name not configured configured");
  }

  const result = await step.run("http-request", async () => {
    // endpoint must be string | URL | Request (we use string)
    const endpoint = String(data.endpoint);

    // method must be string
    const method = typeof data.method === "string" ? data.method : "GET";

    const options: KyOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      const body =
        typeof data.body === "string"
          ? data.body
          : data.body != null
          ? JSON.stringify(data.body)
          : undefined;

      options.body = body;
      options.headers = {
        ...(options.headers ?? {}),
        "content-type": "application/json",
      };
    }

    const response = await ky(endpoint, options);

    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    
    const responsePayload={
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    }
    
    //we can change it later concerning this if and fallback thing to be typesafe
    if (data.variableName){
      return {
        ...context,
        [data.variableName]: responsePayload
      };
    }

    //fallback to direct httpResponse
    return {
      ...context,
      ...responsePayload
    }
  });

  return result;
};
