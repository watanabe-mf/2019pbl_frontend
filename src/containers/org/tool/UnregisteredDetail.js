import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Color from '../../../const/Color';
import { withRouter } from 'react-router';
import SearchWindow from '../../../components/form/SearchWindow';
import Tag from '../../../components/Tag';

class OrgToolUnregisteredDetail extends Component {
  constructor() {
    super();
    this.state = {
      baseData: [],
      fetchTags: [],
      selectTags: [],
      additional_information: '',
      searchValue: ''
    };
  }

  componentDidMount() {
    console.log(this.props);

    this.fetchData();
  }

  fetchData() {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.setState({
          baseData: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    this.setState({
      additional_information: event.target.value
    });
    console.log(this.state);
  }

  createData = () => {
    console.log(this.props.match.params.id);

    const params = {
      organization_id: JSON.parse(sessionStorage.getItem('org')).id,
      tool_id: Number(this.props.match.params.id),
      additional_information: this.state.additional_information,
      is_approved: 'yes',
      last_updated_user_id: 1
    };

    console.log('params', params);

    axios
      .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools`, params)
      .then(response => {
        this.setState({
          isUpdated: true
        });
        console.log(response);
        this.insertTags(response.data.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSearchValue = event => {
    this.setState({
      searchValue: event.target.value
    });

    this.searchTag();
  }

  searchTag() {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tags/search?name=${this.state.searchValue}`)
      .then(response => {
        console.log(response);
        this.setState({
          fetchTags: response.data,
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

  selectTag(id, name) {
    const selectTags = this.state.selectTags.concat({
      id: id,
      name: name
    });
    this.setState({
      selectTags: selectTags,
      searchValue: ''
    });
  }

  createTag = () => {
    const params = {
      organization_id: JSON.parse(sessionStorage.getItem('org')).id,
      name: this.state.searchValue
    };

    axios
      .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tags`, params)
      .then(response => {
        console.log(response);
        this.selectTag(response.data.id, response.data.name);
      })
      .catch(error => {
        console.log(error);
      });
  }

  insertTags(tool_id) {
    for(let i in this.state.selectTags) {
      const taggingParams = {
        organization_tool_id: tool_id,
        organization_tag_id: this.state.selectTags[i].id
      };

      console.log('tagging', taggingParams);

      axios
        .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tagging/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools`, taggingParams)
        .then(response => {
          console.log(response);
          this.props.history.push(`/org/${JSON.parse(sessionStorage.getItem('org')).id}/tool/registered/${tool_id}`)
        })
        .catch(error => {
          console.log(error);
        });

    }
  }

  render() {
    return(
      <React.Fragment>
        <Title>{ this.state.baseData.name }（未登録）</Title>
        <ul>
          <Item>
            <Name>詳細情報</Name>
            <Text>{ this.state.baseData.detail }</Text>
          </Item>
          <Item>
            <Name>追加情報</Name>
            <TextArea name="additional_information" onChange={ this.handleChange } value={ this.state.additional_information } />
          </Item>
          <Item>
            <Name>追加タグ</Name>
            <SearchArea>
              <SearchWindow placeholder="タグを検索" width="500px" value={ this.state.searchValue } onChange={ this.setSearchValue } />
              { (() => {
                if(this.state.searchValue !== '') {
                  return(
                    <SearchResultList>
                      { this.state.fetchTags.map(item => {
                        return(
                          <SearchResultItem key={item.id}>
                            <SearchResultText>{ item.name }</SearchResultText>
                            { (() => {
                              if((this.state.selectTags.findIndex(obj => obj.id === item.id)) !== -1) {
                                return <SearchResultAction>選択済</SearchResultAction>
                              } else {
                                return <SearchResultAction onClick={ () => this.selectTag(item.id, item.name) }>選択</SearchResultAction>
                              }
                            })() }
                          </SearchResultItem>
                        )
                      }) }
                      { (() => {
                        if(this.state.fetchTags.length === 0) {
                          return(
                            <SearchResultItem>
                              <SearchResultText>タグが見つかりません</SearchResultText>
                              <SearchResultAction onClick={ this.createTag }>新規登録して選択</SearchResultAction>
                            </SearchResultItem>
                          );
                        }
                      })() }
                    </SearchResultList>
                  );
                }
              })() }
            </SearchArea>
            <TagList>
              { this.state.selectTags.map(item => {
                return(
                  <li key={item.id}>
                    <Tag text={ item.name } />
                  </li>
                );
              }) }
            </TagList>
          </Item>
        </ul>
        <Button onClick={ this.createData }>登録</Button>
      </React.Fragment>
    );
  }
}

export default withRouter(OrgToolUnregisteredDetail);

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
  font-weight: bold;
`

const Text = styled.div`
  width: 100%;
  font-size: 1.6rem;
  line-height: 30px;
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

const SearchArea = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 500px;
`

const SearchResultList = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  width: 100%;
`

const SearchResultItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #ccc;
  padding: 0 20px;
  width: 100%;
  height: 40px;
`

const SearchResultText = styled.p`
  font-size: 1.6rem;
`

const SearchResultAction = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${ Color.PRIMARY };
  padding: 0 10px;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
`

const TagList = styled.ul`
  display: flex;
`