import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryBreedDeleteById, queryBreedGetStats, queryBreedSearch } from '@/pages/breed/queries';
import { IBreed, IBreedStats } from '@/pages/breed/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  breedList?: IBreed[];
  breedStats?: IBreedStats;
  breedPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    breedSearch: Effect;
    breedGetStats: Effect;
    breedDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'BreedDashboard',

  state: {},

  effects: {
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

    *breedGetStats(_, { call, put }) {
      const data = yield call(queryBreedGetStats);
      yield put({
        type: 'save',
        payload: { breedStats: data.payload },
      });
    },

    *breedDeleteById({ payload }, { call, put }) {
      yield call(queryBreedDeleteById, payload.breedId);
      yield put({ type: 'breedSearch', payload: payload.queryParams });
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
