import { Effect, history, Reducer } from 'umi';

import { queryPetCreate, queryPetGetById, queryPetUpdateById } from '@/pages/pet/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryBreedSearch } from '@/pages/breed/queries';
import { get } from 'lodash';

export interface IState {}

export interface PetModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    breedSearch: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const PetModel: PetModelType = {
  namespace: 'PetForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryPetCreate, payload);
      yield put({ type: 'PetDashboard/petSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/pet');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { petInfo: {} } });
      const data = yield call(queryPetGetById, payload);
      yield put({ type: 'save', payload: { petInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryPetUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'PetDashboard/petSearch', payload: payload.queryParams });
    },

    *breedSearch({ payload }, { call, put }) {
      const data = yield call(queryBreedSearch, payload);
      yield put({
        type: 'save',
        payload: {
          breedList: get(data, 'payload.items'),
          breedPager: get(data, 'payload.pager'),
        },
      });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default PetModel;
