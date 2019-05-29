import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../../../components/Loading';
import ToolCard from '../../../components/ToolCard';

class OrgToolRegistered extends Component {
  constructor() {
    super();
    this.state = {
      tools: [],
      isLoading: false,
      searchValue: ''
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  setSearchValue = event => {
    this.setState({
      searchValue: event.target.value,
      isLoading: true
    });

    if(event.target.value === '') {
      this.fetchData();
    } else {
      this.searchData();
    }
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

  searchData() {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools/search?name=${this.state.searchValue}`)
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
        <Search placeholder="ツール名で検索" value={ this.state.searchValue } onChange={ this.setSearchValue } />
        <List>
          { this.state.tools.map(item => {
            return(
              <Item key={item.id}>
                <ToolCard to={ `/org/${JSON.parse(sessionStorage.getItem('org')).name}/tool/registered/${item.id}` } value={ item.tool.name } />
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

const Search = styled.input`
  width: 800px;
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 20px;
  padding: 20px;
  font-size: 2rem;
  outline: 0;

  &:focus {
    border: solid 3px #ccc;
  }
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.li`
  margin: 30px;
`