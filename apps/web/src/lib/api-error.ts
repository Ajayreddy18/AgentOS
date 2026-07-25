export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};

export function normalizeApiError(error: unknown): ApiError {
  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as {
      response: {
        status: number;
        data?: {
          error?: {
            message?: string;
            code?: string;
          };
        };
      };
    };

    return {
      message: err.response.data?.error?.message ?? "Something went wrong",

      status: err.response.status,

      code: err.response.data?.error?.code,
    };
  }

  if (typeof error === "object" && error !== null && "request" in error) {
    return {
      message: "Unable to connect to server",
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unexpected error occurred",
  };
}
