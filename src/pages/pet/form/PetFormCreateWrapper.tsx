import React, { useEffect } from 'react';
import { connect } from 'umi';
import PetForm from '@/pages/pet/form/PetForm';
import { IPet } from '@/pages/pet/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IPet) => void;
  loadingEffects: ILoadingEffects;
  breedSearch: () => void;
}

const PetFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IPet) => {
    props.create(values);
  };

  useEffect(() => {
    props.breedSearch()
  },[])

  const isLoading = get(props, 'loadingEffects.PetForm/create', false);
  const breedList = get(props,'breedList', []);
  console.log(breedList);

  return <PetForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} breedList={breedList}/>;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  breedList: state.PetForm.breedList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IPet) => dispatch({ type: 'PetForm/create', payload }),
  breedSearch: () => dispatch({ type: 'PetForm/breedSearch', }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetFormCreateWrapper);
