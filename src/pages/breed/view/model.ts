import { Effect, Reducer } from 'umi';

import { queryBreedGetById } from '@/pages/breed/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    breedGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'BreedView',

  state: {},

  effects: {
    *breedGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryBreedGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *breedDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryBreedDeleteById, payload.breedId);
    //   yield put({ type: 'breedSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
