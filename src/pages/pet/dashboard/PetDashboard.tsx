import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import PetFilterForm from '@/pages/pet/dashboard/search/PetFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IPetQueryParams } from '@/pages/pet/types';
import PetSearchList from '@/pages/pet/dashboard/search/PetSearchList';
import PetDashboardControls from '@/pages/pet/dashboard/controls/PetDashboardControls';
import { IState } from '@/pages/pet/dashboard/model';
import PetStats from '@/pages/pet/dashboard/stats/PetStats';

const initialSearchForm = {
  petSearchParam1: '',
  petSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  petGetStats: () => void;
  petSearch: (arg: IPetQueryParams) => void;
  petReset: () => void;
  PetDashboard: IState;
}

const PetDashboard = (props: IProps) => {
  const petStats = get(props, 'PetDashboard.petStats', {});
  const petList = get(props, 'PetDashboard.petList', []);
  const petPager = get(props, 'PetDashboard.petPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.petGetStats();

    return () => {
      props.petReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.petSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IPetQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Pet dashboard</div>
          <PetFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <PetStats stats={petStats} />

        <div>
          <PetDashboardControls />
        </div>
      </div>

      <PetSearchList items={petList} />
      <Pager pager={petPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  PetDashboard: state.PetDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  petSearch: (payload: IPetQueryParams) => dispatch({ type: 'PetDashboard/petSearch', payload }),
  petGetStats: () => dispatch({ type: 'PetDashboard/petGetStats' }),
  petReset: () => dispatch({ type: 'PetDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetDashboard);
