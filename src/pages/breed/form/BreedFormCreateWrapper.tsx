import React, { useEffect } from 'react';
import { connect } from 'umi';
import BreedForm from '@/pages/breed/form/BreedForm';
import { IBreed } from '@/pages/breed/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IBreed) => void;
  petSearch: () => void;
  loadingEffects: ILoadingEffects;
}

const BreedFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IBreed) => {
    props.create(values);
  };

  useEffect(() => {
    props.petSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.BreedForm/create', false);
  const petList = get(props, 'petList', []);

  return <BreedForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} petList={petList}/>;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  petList: state.BreedForm.petList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IBreed) => dispatch({ type: 'BreedForm/create', payload }),
  petSearch: () => dispatch({ type: 'BreedForm/petSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedFormCreateWrapper);
