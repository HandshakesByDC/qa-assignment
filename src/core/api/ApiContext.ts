import axios from "axios";
import { ApiConfig } from "../../types/apiConfig";

export class ApiContext {
  private config: ApiConfig;
  constructor(config: ApiConfig) {
    this.config = config;
  }

  async execute() {
    try {
      return axios.request(this.config);
    } catch (error) {
      return error;
    }
  }
}
