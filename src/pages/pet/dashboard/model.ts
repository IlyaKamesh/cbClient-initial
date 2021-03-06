import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryPetDeleteById, queryPetGetStats, queryPetSearch } from '@/pages/pet/queries';
import { IPet, IPetStats } from '@/pages/pet/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  petList?: IPet[];
  petStats?: IPetStats;
  petPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    petSearch: Effect;
    petGetStats: Effect;
    petDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PetDashboard',

  state: {},

  effects: {
    *petSearch({ payload }, { call, put }) {
      const data = yield call(queryPetSearch, payload);
      yield put({
        type: 'save',
        payload: {
          petList: get(data, 'payload.items'),
          petPager: get(data, 'payload.pager'),
        },
      });
    },

    *petGetStats(_, { call, put }) {
      const data = yield call(queryPetGetStats);
      yield put({
        type: 'save',
        payload: { petStats: data.payload },
      });
    },

    *petDeleteById({ payload }, { call, put }) {
      yield call(queryPetDeleteById, payload.petId);
      yield put({ type: 'petSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
