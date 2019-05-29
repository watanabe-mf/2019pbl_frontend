import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Color from '../../../const/Color';
import { withRouter } from 'react-router';

class OrgToolUnregisteredDetail extends Component {
  constructor() {
    super();
    this.state = {
      baseData: [],
      additional_information: ''
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
    }

    console.log('params', params);

    axios
      .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools`, params)
      .then(response => {
        this.setState({
          isUpdated: true
        });
        console.log(response);
        this.props.history.push(`/org/${JSON.parse(sessionStorage.getItem('org')).id}/tool/registered/${response.data.id}`)
      })
      .catch(error => {
        console.log(error);
      });
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