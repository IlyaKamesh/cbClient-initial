import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IBreed } from '@/pages/breed/types';

interface IProps extends IBreed {
  breedDelete: (id: String) => void;
}

const BreedSearchListItem = (props: IProps) => {
  const { breedDelete } = props;

  const owner = get(props, 'item.owner', '');
  const breedId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => breedDelete(breedId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  breedDelete: (payload: any) => dispatch({ type: 'BreedDashboard/breedDelete', payload }),
});

export default connect(null, mapDispatchToProps)(BreedSearchListItem);
