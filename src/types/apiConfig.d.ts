export interface ApiConfig {
  url: string;
  method: string;
  headers: Record<string, any>;
  data: any;
  timeout?: number;
}

// export class ApiConfig {
//   baseURL: string;
//   path: string;
//   method: string;
//   headers: Record<string, any>;
//   data: any;
//   timeout?: number;
//   fullURL?: string;

//   constructor(
//     path: string,
//     method: string,
//     headers: Record<string, any>,
//     data: any,
//     timeout?: number,
//     baseURL?: string
//   ) {
//     this.baseURL = baseURL;
//     this.path = `${this.baseURL}${path}`;
//     this.method = method;
//     this.headers = headers;
//     this.data = data;
//     this.timeout = timeout;
//   }
// }

// // Example usage:
// const baseUrl = "https://google.com";
// const path = "/search";

// const config = new ApiConfig(baseUrl, path, "GET", {}, {});
