import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, withRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom';

import Text from '../const/Text';
import Color from '../const/Color';
import OrgToolRegistered from '../containers/org/tool/Registered';
import OrgToolUnregistered from '../containers/org/tool/Unregistered';
import OrgToolRegisteredDetail from '../containers/org/tool/RegisteredDetail';
import OrgToolUnregisteredDetail from '../containers/org/tool/UnregisteredDetail';

class OrgLayout extends Component { 
  onClick = () => {
    sessionStorage.removeItem('org');
    this.props.history.push(`/`);
  }

  render() {
    return (
      <BrowserRouter>
        <Header>
          <HeaderTitle>{ Text.SERVICE_NAME }</HeaderTitle>
          <Org>組織：{ JSON.parse(sessionStorage.getItem('org')).name }</Org>
          <Logout onClick={ this.onClick }>ログアウト</Logout>
        </Header>
        <Wrap>
          <Nav>
            <List>
              <Item>
                <LinkText to={`/org/${JSON.parse(sessionStorage.getItem('org')).name }/tools/registered`}>登録済ツール一覧</LinkText>
              </Item>
              <Item>
                <LinkText to={`/org/${JSON.parse(sessionStorage.getItem('org')).name}/tools/unregistered`}>未登録ツール一覧</LinkText>
              </Item>
            </List>
          </Nav>
          <Main>
            <Switch>
              <Route exact path='/org/:org_name/tools/registered' component={ OrgToolRegistered } />
              <Route exact path='/org/:org_name/tools/unregistered' component={ OrgToolUnregistered } />
              <Route exact path='/org/:org_name/tool/registered/:id' component={ OrgToolRegisteredDetail } />
              <Route exact path='/org/:org_name/tool/unregistered/:id' component={ OrgToolUnregisteredDetail } />
              <Redirect to={`/org/${JSON.parse(sessionStorage.getItem('org')).name}/tools/registered`} />
            </Switch>
        </Main>
        </Wrap>
      </BrowserRouter>
    );
  }
}

export default withRouter(OrgLayout);

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${ Color.PRIMARY };
  padding: 0 50px;
  width: 100%;
  height: 50px;
`

const HeaderTitle = styled.p`
  margin-right: auto;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
`

const Org = styled.p`
  margin-right: 20px;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
`

const Logout = styled.button`
  border: solid 1px #ccc;
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 0 15px;
  height: 30px;
  font-size: 1.6rem;
  cursor: pointer;
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