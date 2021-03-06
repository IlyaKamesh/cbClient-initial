import { IPet, IPetQueryParams } from '@/pages/pet/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IPetDeleteById {
  petId: string;
  queryParams: IPetQueryParams;
}

interface IProps {
  row: IPet;
  open: (arg: ISidepanel) => void;
  petDeleteById: (arg: IPetDeleteById) => void;
  queryParams: IPetQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IPet) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IPet) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (petId: string) => {
    props.open({
      title: 'Edit Pet',
      component: 'PetFormEdit',
      place: 'PetDashboard',
      width: 800,
      petId,
    });
  };

  const deletePrompt = (pet: IPet) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${pet.name}`,
      okType: 'danger',
      onOk: () => props.petDeleteById({ petId: pet._id, queryParams }),
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
  petDeleteById: (payload: IPetDeleteById) => dispatch({ type: 'PetDashboard/petDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
