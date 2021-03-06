import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IBreed } from '@/pages/breed/types';
import ActionMenu from '@/pages/breed/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IBreed[];
}

const BreedSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IBreed>[] = [
    {
      title: 'Breed Name',
      key: 'name',
      render: (row) => <Link to={`/breed/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Pet',
      key: 'pet',
      render: (row) => <Link to={`/breed/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Pet Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Pet Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Breed Description',
      dataIndex: 'description',
      key: 'description',
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreedSearchList));
