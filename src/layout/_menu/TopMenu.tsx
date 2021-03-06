import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
// @ts-ignore
import classNames from 'classnames';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Dropdown, Menu } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';

interface IProps {
  Account: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'Account.acl', []);


  const guestMenu = [
    { path: '/pricing', name: 'Pricing' },
    { path: '/industries', name: 'Industries' },
    { path: '/support', name: 'Support' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
  }));

  const mainMenu = [
    {path: '/base', name: 'Base', perm: 'base.get.own'},
    {path: '/pet', name: 'Pets', perm: 'pet.get.own'},
    {path: '/breed', name: 'Breed', perm: 'breed.get.own'},

  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));


  return (
    <div id="top-menu" role="menu" className="d-flex d-print-none">
        {mainMenu.map(
          (el) =>
            el.isVisible && (
              <div className={classNames('item', { active: el.isActive })} key={el.path}>
                <Link to={el.path}>{el.name}</Link>
              </div>
            ),
        )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
