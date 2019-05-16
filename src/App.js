import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Text from './const/Text';
import Color from './const/Color';

import AdminToolNew from './containers/admin/tool/New';

const App = () => (
  <BrowserRouter>
    <Header>
      { Text.SERVICE_NAME_ADMIN }
    </Header>
    <Wrap>
      <Nav>
        <List>
          <Item>
            <LinkText exact to="/admin/tool/">ツール一覧</LinkText>
          </Item>
          <Item>
            <LinkText exact to="/admin/tool/new">ツール新規登録</LinkText>
          </Item>
        </List>
      </Nav>
      <Route exact path='/admin/tool/new' component={ AdminToolNew } />
    </Wrap>
  </BrowserRouter>
);

export default App;

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
  padding: 50px 0;
`

const Nav = styled.nav`
  width: 300px;
  padding: 0 50px;
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