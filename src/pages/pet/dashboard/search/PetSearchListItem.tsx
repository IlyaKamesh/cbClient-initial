import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IPet } from '@/pages/pet/types';

interface IProps extends IPet {
  petDelete: (id: String) => void;
}

const PetSearchListItem = (props: IProps) => {
  const { petDelete } = props;

  const owner = get(props, 'item.owner', '');
  const petId = get(props, 'item._id', '');
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
        <Button danger onClick={() => petDelete(petId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  petDelete: (payload: any) => dispatch({ type: 'PetDashboard/petDelete', payload }),
});

export default connect(null, mapDispatchToProps)(PetSearchListItem);
