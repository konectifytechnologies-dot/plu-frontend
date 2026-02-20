import axios from "axios"
import { getApiError } from "./api-error"

type SafeResult =
  | { data: any; error: null }
  | { data: null; error: string }

export async function apiRequest(
  request: () => Promise<{ data: any }>
): Promise<SafeResult> {
  try {
    const { data } = await request()
    return { data, error: null }
  } catch (error) { 
    return { data: null, error: getApiError(error) }
  }
}
