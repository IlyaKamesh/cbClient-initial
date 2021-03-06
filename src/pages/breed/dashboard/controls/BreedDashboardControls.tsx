import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const BreedDashboardControls = (props: IProps) => {
  const breedCreate = () => {
    props.open({
      title: 'Create new Breed',
      component: 'BreedFormCreate',
      place: 'BreedDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={breedCreate}>
      Create A Breed
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(BreedDashboardControls);
