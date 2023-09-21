import { AppApi } from "../../constants/api";

export function getCurrentBaseURL(): string {
  return AppApi.BASE_URL["PROD"];
}
