import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../../../components/Loading';
import ToolCard from '../../../components/ToolCard';

class AdminToolList extends Component {
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
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools`)
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
    console.log(this.state.tools);
    return(
      <React.Fragment>
        <Loading isLoading={ this.state.isLoading } text="読み込み中" />
        <Title>ツール一覧</Title>
        <List>
          { this.state.tools.map(tool => {
            return(
              <Item key={tool.id}>
                <ToolCard to={ `/admin/tool/${tool.id}` } value={ tool.name } />
              </Item>
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
`