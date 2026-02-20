import axios, { AxiosError } from "axios"

type LaravelErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
}

export function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as LaravelErrorResponse | undefined

    // Validation error
    if (error.response?.status === 422 && data?.errors) {
      return Object.values(data.errors)[0][0]
    }

    // Normal API error
    return data?.message ?? "Something went wrong"
  }

  return "Unexpected error"
}
