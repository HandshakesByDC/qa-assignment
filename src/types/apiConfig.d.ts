export interface ApiConfig {
  url: string;
  method: string;
  headers: Record<string, any>;
  data: any;
  timeout?: number;
}
