import {client} from 'src/api/index.';
import {AxiosRequestConfig, AxiosResponse} from 'axios';


export const useFetch = async <T>(url: string, options?: AxiosRequestConfig) => {
  const response = await client.get(url, options);

  return {...response} as AxiosResponse<T>;
}
