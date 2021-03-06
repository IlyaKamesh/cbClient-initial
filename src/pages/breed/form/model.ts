import { Effect, history, Reducer } from 'umi';

import { queryBreedCreate, queryBreedGetById, queryBreedSearch, queryBreedUpdateById } from '@/pages/breed/queries';
import defaultReducers from '@/utils/defaultReducers';
import { get } from 'lodash';
import { queryPetSearch } from '@/pages/pet/queries';

export interface IState {}

export interface BreedModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    // breedSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const BreedModel: BreedModelType = {
  namespace: 'BreedForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryBreedCreate, payload);
      yield put({ type: 'BreedDashboard/breedSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/breed');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { breedInfo: {} } });
      const data = yield call(queryBreedGetById, payload);
      yield put({ type: 'save', payload: { breedInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryBreedUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'BreedDashboard/breedSearch', payload: payload.queryParams });
    },

    // *breedSearch(_, { call, put }) {
    //   const data = yield call(queryBreedSearch);
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       breedList: get(data, 'payload.items'),
    //     },
    //   });
    // },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default BreedModel;
