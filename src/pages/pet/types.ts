export interface IPet {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPetStats {
  totalPet: number;
  todayPet: number;
  monthPet: number;
  averagePet: number;
}

export interface IPetQueryParams {
  limit?: number | string;
  page?: number | string;
  petSearchParam1?: string;
  petSearchParam2?: string;
}
