import {reactive} from 'vue';
import {useFetch} from 'src/use/fetch';
import {DataType} from 'src/types';

export const useData = async () => {
  const {data} = await useFetch<DataType>('/assets/data.json');
  const responseData = reactive<DataType>(data);
  return {responseData};
};
