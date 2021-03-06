import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import BreedForm from '@/pages/breed/form/BreedForm';
import { IBreed } from '@/pages/breed/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (breedId: string) => void;
  reset: () => void;
  petSearch: () => void;
  updateById: any;
  breedInfo: IBreed;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const BreedFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const breedId: string = get(props, 'sidepanel.breedId', '');

  const isLoadingGet = get(props, 'loadingEffects.BreedForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.BreedForm/updateById', false);
  const petList = get(props, 'petList', []);

  useEffect(() => {
    props.getById(breedId);
    props.petSearch();
  }, []);

  const onFinish = (values: IBreed) => {
    props.updateById({ values, breedId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <BreedForm
      onFinish={onFinish}
      initialValues={props.breedInfo}
      submitButtonText="Update"
      petList={petList}
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  breedInfo: state.BreedForm.breedInfo,
  loadingEffects: state.loading.effects,
 petList: state.BreedForm.petList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'BreedForm/reset' }),
  updateById: (payload: IBreed) => dispatch({ type: 'BreedForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'BreedForm/getById', payload }),
  petSearch: () => dispatch({ type: 'BreedForm/petSearch' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreedFormEditWrapper));
