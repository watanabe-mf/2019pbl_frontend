import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Text from '../const/Text';
import Color from '../const/Color';
import AdminToolList from '../containers/admin/tool/List';
import AdminToolDetail from '../containers/admin/tool/Detail';
import AdminToolNew from '../containers/admin/tool/New';

const AdminLayout = () => (
  <BrowserRouter>
    <Header>
      { Text.SERVICE_NAME_ADMIN }
    </Header>
    <Wrap>
      <Nav>
        <List>
          <Item>
            <LinkText to="/admin/tools">ツール一覧</LinkText>
          </Item>
          <Item>
            <LinkText to="/admin/tool/new">ツール新規登録</LinkText>
          </Item>
        </List>
      </Nav>
      <Main>
        <Switch>
          <Route exact path='/admin/tools' component={ AdminToolList } />
          <Route exact path='/admin/tool/new' component={ AdminToolNew } />
          <Route exact path='/admin/tool/:id' component={ AdminToolDetail } />
        </Switch>
    </Main>
    </Wrap>
  </BrowserRouter>
);

export default AdminLayout;

const Header = styled.header`
  background-color: ${ Color.PRIMARY };
  padding: 0 50px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-size: 3rem;
  color: #fff;
`

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
`

const Nav = styled.nav`
  width: 300px;
  height: 100%;
  padding: 50px;
  overflow-y: scroll;
`

const List = styled.ul`
  width: 100%;
`

const Item = styled.li`
  width: 100%;
  height: 40px;
`

const LinkText = styled(NavLink)`
  display: block;
  border-radius: 5px;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  line-height: 40px;
  font-size: 2rem;
  color: #333;

  &:hover {
    background-color: #f2f2f2;
  }

  &.active {
    font-weight: bold;
  }
`

const Main = styled.main`
  padding: 50px;
  background-color: #f2f2f2;
  width: calc(100% - 300px);
  height: 100%;
  overflow-y: scroll;
`