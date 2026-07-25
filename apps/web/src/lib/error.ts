import type { ApiError } from "@/types/api-error";

type AxiosLikeError = {
  response?: {
    status: number;
    data?: {
      message?: string;
      code?: string;
      error?: {
        message?: string;
        code?: string;
      };
    };
  };
};

export function getErrorMessage(error: unknown): ApiError {
  // Already normalized ApiError
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    !("response" in error)
  ) {
    const apiError = error as ApiError;

    return {
      message: apiError.message,
      status: apiError.status,
      code: apiError.code,
    };
  }

  // Raw Axios error
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as AxiosLikeError).response;

    return {
      message:
        response?.data?.error?.message ??
        response?.data?.message ??
        "Something went wrong.",

      status: response?.status,

      code: response?.data?.error?.code ?? response?.data?.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unexpected error occurred.",
  };
}
