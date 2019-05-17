import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Color from '../../../const/Color';

class AdminToolList extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        detail: ''
      },
      tools: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools`)
      .then(response => {
        console.log(response);
        this.setState({
          tools: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.tools);
    return(
      <React.Fragment>
        <Title>ツール一覧</Title>
        <List>
          { this.state.tools.map(tool => {
            return(
              <Item key={tool.id}>{tool.name}</Item>
            );
          }) }
        </List>
      </React.Fragment>
    );
  }
}

export default AdminToolList;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 3rem;
  color: #333;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.li`
  margin: 30px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  width: 300px;
  font-size: 3rem;
  font-weight: bold;
`