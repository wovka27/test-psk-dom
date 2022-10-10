import {ref} from 'vue'
import {DataType, FlatType, StatusApartmentEnum} from 'src/types';

type PredicateType<P> = (value: P, index: number, array: P[]) => boolean

const getCount = <T>(data: T[], predicate: PredicateType<T>) => {
  return data.filter(predicate);
}

export const useFilter = (data: DataType) => {
  const arr: FlatType[] = Object.values(data.flats);
  const dataCount = ref<FlatType[]>(arr).value;

  const bookingDataCount = ref<FlatType[]>(getCount(arr, (value) => value.status === StatusApartmentEnum.BOOKING)).value;
  const issuedDataCount = ref<FlatType[]>(getCount(arr, (value) => value.status === StatusApartmentEnum.ISSUED)).value;
  const freeDataCount = ref<FlatType[]>(getCount(arr, (value) => value.status === StatusApartmentEnum.FREE)).value;

  const subsidyCount = ref<FlatType[]>(getCount(arr, (value) => value.subsidy)).value;
  const installmentCount = ref<FlatType[]>(getCount(arr, (value) => value.installment)).value;
  const renovationCount = ref<FlatType[]>(getCount(arr, (value) => value.renovation)).value;

  const filterData = ref<FlatType[]>([]);

  const setFilterData = (data: FlatType[]) => {
    filterData.value = data
  };

  return {
    dataCount,
    bookingDataCount,
    issuedDataCount,
    subsidyCount,
    installmentCount,
    renovationCount,
    freeDataCount,
    setFilterData,
    filterData
  };
}
