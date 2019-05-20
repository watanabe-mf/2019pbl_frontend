import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Color from '../../../const/Color';
import Message from '../../../components/Message';

class AdminToolDetail extends Component {
  constructor() {
    super();
    this.state = {
      tool: [],
      isUpdated: false,
      isDeleted: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.setState({
          tool: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    const data = this.state.tool;
    data[event.target.name] = event.target.value;

    this.setState({
      tool: data
    });
    console.log(this.state);
  }

  updateData = () => {
    this.setState({
      isUpdated: false
    });

    axios
      .put(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools/${this.props.match.params.id}`, {
        name: this.state.tool.name,
        detail: this.state.tool.detail
      })
      .then(response => {
        this.setState({
          isUpdated: true
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteData = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          isDeleted: true
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
        { this.state.isDeleted ? <Message text="削除しました。" /> :
        <React.Fragment>
        { this.state.isUpdated && <Message text="更新しました。" /> }
        <Title>ツール詳細</Title>
        <ul>
          <Item>
            <Name>ツール名</Name>
            <InputText name="name" type="text" onChange={ this.handleChange } value={ this.state.tool.name } />
          </Item>
          <Item>
            <Name>詳細情報</Name>
            <TextArea name="detail" onChange={ this.handleChange } value={ this.state.tool.detail } />
          </Item>
        </ul>
        <Button onClick={ this.updateData }>更新</Button>
        <Button onClick={ this.deleteData }>削除</Button>
        </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default AdminToolDetail;

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