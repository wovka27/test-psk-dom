import {ref} from 'vue'
import {DataType, FlatType, StatusApartmentEnum} from 'src/types';

type PredicateType<P> = (value: P, index: number, array: P[]) => boolean

const getCount = <T>(data: T[], predicate: PredicateType<T>): number => {
  return data.filter(predicate).length;
}

export const useFilter = (data: DataType) => {
  const arr: FlatType[] = Object.values(data.flats);
  const dataCount = ref<number>(arr.length).value;

  const bookingDataCount = ref<number>(getCount(arr, (value) => value.status === StatusApartmentEnum.BOOKING)).value;
  const issuedDataCount = ref<number>(getCount(arr, (value) => value.status === StatusApartmentEnum.ISSUED)).value;
  const freeDataCount = ref<number>(getCount(arr, (value) => value.status === StatusApartmentEnum.FREE)).value;

  const subsidyCount = ref<number>(getCount(arr, (value) => value.subsidy)).value;
  const installmentCount = ref<number>(getCount(arr, (value) => value.installment)).value;
  const renovationCount = ref<number>(getCount(arr, (value) => value.renovation)).value;

  return {dataCount, bookingDataCount, issuedDataCount, subsidyCount, installmentCount, renovationCount, freeDataCount};
}
