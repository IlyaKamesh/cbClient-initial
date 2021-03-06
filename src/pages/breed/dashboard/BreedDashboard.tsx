import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import BreedFilterForm from '@/pages/breed/dashboard/search/BreedFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IBreedQueryParams } from '@/pages/breed/types';
import BreedSearchList from '@/pages/breed/dashboard/search/BreedSearchList';
import BreedDashboardControls from '@/pages/breed/dashboard/controls/BreedDashboardControls';
import { IState } from '@/pages/breed/dashboard/model';
import BreedStats from '@/pages/breed/dashboard/stats/BreedStats';

const initialSearchForm = {
  breedSearchParam1: '',
  breedSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  breedGetStats: () => void;
  breedSearch: (arg: IBreedQueryParams) => void;
  breedReset: () => void;
  BreedDashboard: IState;
}

const BreedDashboard = (props: IProps) => {
  const breedStats = get(props, 'BreedDashboard.breedStats', {});
  const breedList = get(props, 'BreedDashboard.breedList', []);
  const breedPager = get(props, 'BreedDashboard.breedPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.breedGetStats();

    return () => {
      props.breedReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.breedSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IBreedQueryParams) => {
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
          <div className="h4 mr-4">Breed dashboard</div>
          <BreedFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <BreedStats stats={breedStats} />

        <div>
          <BreedDashboardControls />
        </div>
      </div>

      <BreedSearchList items={breedList} />
      <Pager pager={breedPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  BreedDashboard: state.BreedDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  breedSearch: (payload: IBreedQueryParams) => dispatch({ type: 'BreedDashboard/breedSearch', payload }),
  breedGetStats: () => dispatch({ type: 'BreedDashboard/breedGetStats' }),
  breedReset: () => dispatch({ type: 'BreedDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedDashboard);
