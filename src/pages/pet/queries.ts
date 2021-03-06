import { get, patch, post, del } from '@/utils/httpMethods';
import { IPet, IPetQueryParams } from '@/pages/pet/types';

export async function queryPetCreate(payload: any): Promise<any> {
  return post({ url: '/pet', data: payload });
}

export async function queryPetGetById(id: string): Promise<any> {
  return get({ url: `/pet/${id}` });
}

export async function queryPetUpdateById(payload: { petId: string; values: IPet }): Promise<any> {
  return patch({ url: `/pet/${payload.petId}`, data: payload.values });
}

export async function queryPetDeleteById(petId: string): Promise<any> {
  return del({ url: `/pet/${petId}` });
}

export async function queryPetSearch(payload: IPetQueryParams): Promise<any> {
  return post({ url: '/pet/search', data: payload });
}

export async function queryPetGetAll(): Promise<any> {
  return get({ url: '/pet' });
}

export async function queryPetGetStats(): Promise<any> {
  return get({ url: `/pet/stats` });
}
