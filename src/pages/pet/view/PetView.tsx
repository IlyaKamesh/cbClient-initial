import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  petId: string;
  name: string;
  petGetById: (id: string) => void;
}

const PetView = (props: IProps) => {
  const petId = get(props, 'match.params.petId');
  const name = get(props, 'PetView.name', '');

  console.log(props);

  useEffect(() => {
    props.petGetById(petId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  PetView: state.PetView,
});

const mapDispatchToProps = (dispatch: any) => ({
  petGetById: (payload: string) => dispatch({ type: 'PetView/petGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetView);
