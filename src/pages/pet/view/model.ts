import { Effect, Reducer } from 'umi';

import { queryPetGetById } from '@/pages/pet/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    petGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PetView',

  state: {},

  effects: {
    *petGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryPetGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *petDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryPetDeleteById, payload.petId);
    //   yield put({ type: 'petSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
