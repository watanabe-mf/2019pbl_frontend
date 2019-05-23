import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router';

import Text from '../const/Text';
import Color from '../const/Color';
import InputText from '../components/form/InputText';
import Button from '../components/form/Button';

class Top extends Component {
  constructor() {
    super();
    this.state = {
      isCreate: true,
      isLogin: false,
      orgName: ''
    };
  }

  handleChange = event => {
    this.setState({
      orgName: event.target.value
    });
    console.log(this.state);
  }

  createOrganization = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organizations`, {
        name: this.state.orgName
      })
      .then(response => {
        console.log(response);
        sessionStorage.setItem('org', JSON.stringify(response.data));
        this.props.history.push(`/org/${ response.data.name }`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loginOrganization = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organizations/search?name=${this.state.orgName}`)
      .then(response => {
        console.log(response);
        sessionStorage.setItem('org', JSON.stringify(response.data));
        this.props.history.push(`/org/${response.data.name}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectCreate = () => {
    this.setState({
      isCreate: true,
      isLogin: false
    });
  }

  selectLogin = () => {
    this.setState({
      isCreate: false,
      isLogin: true
    });
  }

  render() {
    return(
      <Root>
        <Wrap>
          <Title>{ Text.SERVICE_NAME }</Title>
          <Concept>{ Text.SERVICE_NAME }は組織が使っているツールを<br />一覧で可視化できます。</Concept>
        </Wrap>
        <Wrap>
          <List>
            <Item isActive={ this.state.isCreate } onClick={ this.selectCreate }>組織を作成</Item>
            <Item isActive={ this.state.isLogin } onClick={ this.selectLogin }>組織にログイン</Item>
          </List>
          <FormItem>
            <FormItem>
              <InputText name="orgName" value={ this.state.orgName } placeholder="組織名を入力" width="300px" onChange={ this.handleChange } />
            </FormItem>
            { this.state.isCreate && <Button text="作成" width="300px" onClick={ this.createOrganization } /> }
            { this.state.isLogin && <Button text="ログイン" width="300px" onClick={ this.loginOrganization } /> }
          </FormItem>
        </Wrap>
      </Root>
    );
  }
}

export default withRouter(Top);

const Root = styled.div`
  display: flex;
  background-color: ${ Color.PRIMARY };
  width: 100%;
  min-height: 100vh;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`

const Title = styled.h1`
  margin-bottom: 50px;
  font-size: 10rem;
  color: #fff;
`

const Concept = styled.p`
  font-size: 3rem;
  color: #fff;
`

const List = styled.ul`
  display: flex;
  margin-bottom: 50px;
  width: 400px;
`

const Item = styled.li`
  width: 50%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  border-bottom: ${ props => props.isActive ? 'solid 2px #fff' : 'none' };
`

const FormItem = styled.div`
  margin-bottom: 30px;
`