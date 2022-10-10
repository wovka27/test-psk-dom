import {computed, ref} from 'vue';
import {DataType, FilterType, FlatType, PredicateType, StatusApartmentEnum} from 'src/types';
import {useFilterStore} from 'stores/filter-store';

const getCount = <T>(data: T[], predicate: PredicateType<T>) => {
  return data.filter(predicate);
};

export const useFilter = (data: DataType) => {
  const {setFilterData, filterData} = useFilterStore();
  const refData = ref<FlatType[]>(Object.values(data.flats)).value;

  const bookingData = computed(() =>
    getCount(refData, (value) => value.status === StatusApartmentEnum.BOOKING)
  );
  const issuedData = computed(() =>
    getCount(refData, (value) => value.status === StatusApartmentEnum.ISSUED)
  );
  const freeData = computed(() =>
    getCount(refData, (value) => value.status === StatusApartmentEnum.FREE)
  );
  const subsidy = computed(() => getCount(refData, (value) => value.subsidy));
  const installment = computed(() =>
    getCount(refData, (value) => value.installment)
  );
  const renovation = computed(() =>
    getCount(refData, (value) => value.renovation)
  );
  const marginal = computed(() => getCount(refData, (value) => value.marginal));

  const onChangeItem =
    (key: keyof FlatType | null) => (value: { min: number; max: number }) => {
      const arr = computed(
        () => refData.filter(
          (item) =>
            item[key] && item[key] >= value.min && item[key] <= value.max
        )
      );
      if (arr.value) {
        setFilterData(arr.value);
      }
    };

  return {
    refData,
    bookingData,
    issuedData,
    subsidy,
    installment,
    renovation,
    freeData,
    setFilterData,
    filterData,
    marginal,
    onChangeItem,
  } as FilterType;
};
