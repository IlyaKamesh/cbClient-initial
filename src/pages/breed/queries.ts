import { get, patch, post, del } from '@/utils/httpMethods';
import { IBreed, IBreedQueryParams } from '@/pages/breed/types';

export async function queryBreedCreate(payload: any): Promise<any> {
  return post({ url: '/breed', data: payload });
}

export async function queryBreedGetById(id: string): Promise<any> {
  return get({ url: `/breed/${id}` });
}

export async function queryBreedUpdateById(payload: { breedId: string; values: IBreed }): Promise<any> {
  return patch({ url: `/breed/${payload.breedId}`, data: payload.values });
}

export async function queryBreedDeleteById(breedId: string): Promise<any> {
  return del({ url: `/breed/${breedId}` });
}

export async function queryBreedSearch(payload: IBreedQueryParams): Promise<any> {
  return post({ url: '/breed/search', data: payload });
}

export async function queryBreedGetAll(): Promise<any> {
  return get({ url: '/breed' });
}

export async function queryBreedGetStats(): Promise<any> {
  return get({ url: `/breed/stats` });
}
