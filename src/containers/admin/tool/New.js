import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Color from '../../../const/Color';
import Message from '../../../components/Message';

class AdminToolNew extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        detail: ''
      },
      isCreated: false
    }
  }

  handleChange = event => {
    const data = this.state.data;
    data[event.target.name] = event.target.value;

    this.setState({
      data: data
    });
    console.log(this.state);
  }

  handleClick = () => {
    this.setState({
      isCreated: false
    });

    axios
      .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools`, {
        name: this.state.data.name,
        detail: this.state.data.detail
      })
      .then(response => {
        this.setState({
          isCreated: true
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return(
      <React.Fragment>
        { this.state.isCreated && <Message text="登録しました。" /> }
        <Title>ツール新規登録</Title>
        <ul>
          <Item>
            <Name>ツール名</Name>
            <InputText name="name" type="text" onChange={ this.handleChange } value={ this.state.name } />
          </Item>
          <Item>
            <Name>詳細情報</Name>
            <TextArea name="detail" onChange={ this.handleChange }>{ this.state.detail }</TextArea>
          </Item>
        </ul>
        <Button onClick={ this.handleClick }>登録</Button>
      </React.Fragment>
    );
  }
}

export default AdminToolNew;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 3rem;
  color: #333;
`

const Item = styled.li`
  margin-bottom: 30px;
`

const Name = styled.p`
  margin-bottom: 10px;
  font-size: 1.6rem;
`

const InputText = styled.input`
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 5px;
  padding: 0 10px;
  width: 500px;
  height: 40px;
  font-size: 1.6rem;
`

const TextArea = styled.textarea`
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 500px;
  height: 300px;
  font-size: 1.6rem;
`

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${ Color.PRIMARY };
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`