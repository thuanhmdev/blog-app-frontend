export {};

declare global {
  type TRequest = {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
    typeComponent?: "SSR" | "CSR";
  };
}
