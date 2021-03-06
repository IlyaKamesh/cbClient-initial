import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import PetForm from '@/pages/pet/form/PetForm';
import { IPet } from '@/pages/pet/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (petId: string) => void;
  reset: () => void;
  updateById: any;
  breedSearch: () => void;

  petInfo: IPet;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PetFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const petId: string = get(props, 'sidepanel.petId', '');

  const isLoadingGet = get(props, 'loadingEffects.PetForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.PetForm/updateById', false);
  const breedList = get(props,'breedList', []);

  useEffect(() => {
    props.getById(petId);
    props.breedSearch()
  }, []);

  const onFinish = (values: IPet) => {
    props.updateById({ values, petId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <PetForm
      onFinish={onFinish}
      initialValues={props.petInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      breedList={breedList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  petInfo: state.PetForm.petInfo,
  loadingEffects: state.loading.effects,
  breedList: state.PetForm.breedList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'PetForm/reset' }),
  updateById: (payload: IPet) => dispatch({ type: 'PetForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'PetForm/getById', payload }),
  breedSearch: () => dispatch({ type: 'PetForm/breedSearch', }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PetFormEditWrapper));
