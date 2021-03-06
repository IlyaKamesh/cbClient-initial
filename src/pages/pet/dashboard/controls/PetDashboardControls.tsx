import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const PetDashboardControls = (props: IProps) => {
  const petCreate = () => {
    props.open({
      title: 'Create new Pet',
      component: 'PetFormCreate',
      place: 'PetDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={petCreate}>
      Create A Pet
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(PetDashboardControls);
