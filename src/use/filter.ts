import {ref} from 'vue'
import {DataType, FlatType, StatusApartmentEnum} from 'src/types';

export type PredicateType<P> = (value: P, index: number, array: P[]) => boolean

const getCount = <T>(data: T[], predicate: PredicateType<T>) => {
  return data.filter(predicate);
}

export const useFilter = (data: DataType) => {
  const arr: FlatType[] = Object.values(data.flats);
  const dataCount = ref<FlatType[]>(arr).value;

  const bookingData = ref<FlatType[]>(getCount(arr, (value) => value.status === StatusApartmentEnum.BOOKING)).value;
  const issuedData = ref<FlatType[]>(getCount(arr, (value) => value.status === StatusApartmentEnum.ISSUED)).value;
  const freeData = ref<FlatType[]>(getCount(arr, (value) => value.status === StatusApartmentEnum.FREE)).value;

  const subsidy = ref<FlatType[]>(getCount(arr, (value) => value.subsidy)).value;
  const installment = ref<FlatType[]>(getCount(arr, (value) => value.installment)).value;
  const renovation = ref<FlatType[]>(getCount(arr, (value) => value.renovation)).value;
  const marginalData = ref<FlatType[]>(getCount(arr, (value) => value.marginal)).value;

  const filterData = ref<FlatType[]>([]);

  const setFilterData = (data: FlatType[]) => {
    filterData.value = data
  };

  return {
    dataCount,
    bookingDataCount: bookingData,
    issuedDataCount: issuedData,
    subsidyCount: subsidy,
    installmentCount: installment,
    renovationCount: renovation,
    freeDataCount: freeData,
    setFilterData,
    filterData,
    marginalData
  };
}
