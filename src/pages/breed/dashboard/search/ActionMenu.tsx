import { IBreed, IBreedQueryParams } from '@/pages/breed/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IBreedDeleteById {
  breedId: string;
  queryParams: IBreedQueryParams;
}

interface IProps {
  row: IBreed;
  open: (arg: ISidepanel) => void;
  breedDeleteById: (arg: IBreedDeleteById) => void;
  queryParams: IBreedQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IBreed) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IBreed) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (breedId: string) => {
    props.open({
      title: 'Edit Breed',
      component: 'BreedFormEdit',
      place: 'BreedDashboard',
      width: 800,
      breedId,
    });
  };

  const deletePrompt = (breed: IBreed) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${breed.name}`,
      okType: 'danger',
      onOk: () => props.breedDeleteById({ breedId: breed._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  breedDeleteById: (payload: IBreedDeleteById) => dispatch({ type: 'BreedDashboard/breedDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);