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
