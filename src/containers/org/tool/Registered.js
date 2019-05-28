import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../../../components/Loading';

class OrgToolRegistered extends Component {
  constructor() {
    super();
    this.state = {
      tools: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      isLoading: true
    });

    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools`)
      .then(response => {
        console.log(response);
        this.setState({
          tools: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    console.log(this.state);
    return(
      <React.Fragment>
        <Loading isLoading={ this.state.isLoading } text="読み込み中" />
        <Title>登録済ツール一覧</Title>
        <List>
          { this.state.tools.map(item => {
            return(
              <Item key={item.id}>
                <ItemLink to={`/org/${JSON.parse(sessionStorage.getItem('org')).name}/tool/registered/${item.id}`}>{ item.tool.name }</ItemLink>
              </Item>
            );
          }) }
        </List>
      </React.Fragment>
    );
  }
}

export default OrgToolRegistered;

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
  border-radius: 5px;
  background-color: #fff;
  width: 300px;
  font-size: 3rem;
  font-weight: bold;
`

const ItemLink = styled(Link)`
  display: block;
  padding: 20px;
  color: #333;
`