export type DataType = {
  flats: Record<string, FlatType>;
  houses: string[];
  entrances: EntranceType[];
}

export type EntranceType = {
  flats_max: number;
  floors: FloorType[];
  house_id: string;
  id: string;
  title: string;
}

export type FloorType = {
  flats: FloorFlatType[];
  floor: number;
}

export type FloorFlatType = {
  id: string;
  number: number;
}

export type FlatType = {
  article: null;
  cost: number;
  floor: number;
  id: string;
  installment: boolean;
  marginal: boolean;
  number: string;
  plan_type: string | null;
  renovation: boolean;
  square: number;
  state: string | null;
  status: string;
  subsidy: boolean;
  type: string;
}

export enum StatusApartmentEnum {
  FREE = 'Свободна',
  ISSUED = 'Выданы ключи',
  BOOKING = 'Бронь',
  CONTRACT = 'Договор',
}

export type MinMaxType = { min: number; max: number }
export type ItemType = { text: string; arr: FlatType[] }

export type FilterType = {
  refData: FlatType[];
  bookingData: FlatType[];
  issuedData: FlatType[];
  subsidy: FlatType[];
  installment: FlatType[];
  renovation: FlatType[];
  freeData: FlatType[];
  marginal: FlatType[];
  setFilterData: (d: FlatType[]) => void;
  onChangeItem: (key: keyof FlatType | null) => (value: MinMaxType) => void;
}
