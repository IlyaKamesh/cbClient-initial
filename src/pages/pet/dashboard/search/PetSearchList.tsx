import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IPet } from '@/pages/pet/types';
import ActionMenu from '@/pages/pet/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IPet[];
}

const PetSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IPet>[] = [
    {
      title: 'Owner Name',
      key: 'name',
      render: (row) => <Link to={`/pet/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Pet name',
      dataIndex: 'petName',
      key: 'petName',
    },
    {
      title: 'Breed',
      key: 'breed',
      render: (row) => <Link to={`/breed/${row._id}`}>{row.breed.name}</Link>,
    },
    {
      title: 'Pet Birth Date',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'actions',
      width: 80,
      render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={items}
      size="middle"
      className="table-middle"
      pagination={false}
    />
  );
};

// state: any
const mapStateToProps = () => ({});

//dispatch: any
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PetSearchList));
