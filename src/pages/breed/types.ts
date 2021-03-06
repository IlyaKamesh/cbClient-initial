export interface IBreed {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IBreedStats {
  totalBreed: number;
  todayBreed: number;
  monthBreed: number;
  averageBreed: number;
}

export interface IBreedQueryParams {
  limit?: number | string;
  page?: number | string;
  breedSearchParam1?: string;
  breedSearchParam2?: string;
}
