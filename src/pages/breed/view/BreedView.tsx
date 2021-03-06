import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  breedId: string;
  name: string;
  breedGetById: (id: string) => void;
}

const BreedView = (props: IProps) => {
  const breedId = get(props, 'match.params.breedId');
  const name = get(props, 'BreedView.name', '');

  console.log(props);

  useEffect(() => {
    props.breedGetById(breedId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  BreedView: state.BreedView,
});

const mapDispatchToProps = (dispatch: any) => ({
  breedGetById: (payload: string) => dispatch({ type: 'BreedView/breedGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedView);
