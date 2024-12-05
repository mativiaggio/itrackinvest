import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return await response.json();
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error("Login Error:", error.message);
    },
  });

  return mutation;
};
