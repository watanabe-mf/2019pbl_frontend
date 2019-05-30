import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import Color from '../../../const/Color';
import Message from '../../../components/Message';
import Datetime from '../../../components/Datetime';
import Tag from '../../../components/Tag';

class OrgToolRegisteredDetail extends Component {
  constructor() {
    super();
    this.state = {
      baseData: [],
      orgData: [],
      tags: [],
      isUpdated: false,
      isDeleted: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.setState({
          baseData: response.data.tool,
          orgData: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tagging/organization/${JSON.parse(sessionStorage.getItem('org')).id}/tools/${this.props.match.params.id}`)
      .then(response => {
        console.log('tags', response);
        this.setState({
          tags: response.data
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

  // updateData = () => {
  //   this.setState({
  //     isUpdated: false
  //   });

  //   axios
  //     .put(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools/${this.props.match.params.id}`, {
  //       name: this.state.tool.name,
  //       detail: this.state.tool.detail
  //     })
  //     .then(response => {
  //       this.setState({
  //         isUpdated: true
  //       });
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // deleteData = () => {
  //   axios
  //     .delete(`${process.env.REACT_APP_BASE_API_ENDPOINT}/tools/${this.props.match.params.id}`)
  //     .then(response => {
  //       this.setState({
  //         isDeleted: true
  //       });
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    return(
      <React.Fragment>
        { this.state.isDeleted ? <Message text="削除しました。" /> :
        <React.Fragment>
        { this.state.isUpdated && <Message text="更新しました。" /> }
        <Title>{ this.state.baseData.name }</Title>
        <ul>
          <Item>
            <Name>追加タグ</Name>
            <Text>{ this.state.tags.map(item => {
              return(
                <Tag key={item.id} text={ item.organizationTag.name } />
              );
            }) }</Text>
          </Item>
          <Item>
            <Name>詳細情報</Name>
            <Text>{ this.state.baseData.detail }</Text>
          </Item>
          <Item>
            <Name>追加情報</Name>
            <Text>{ this.state.orgData.additional_information }</Text>
          </Item>
          <Item>
            <Name>追加日時</Name>
            <Text><Datetime target={ this.state.orgData.created_at } /></Text>
          </Item>
          <Item>
            <Name>更新日時</Name>
            <Text><Datetime target={ this.state.orgData.updated_at } /></Text>
          </Item>
        </ul>
        {/* <Button onClick={ this.updateData }>更新</Button>
        <Button onClick={ this.deleteData }>削除</Button> */}
        </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default OrgToolRegisteredDetail;

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

// const InputText = styled.input`
//   background-color: #fff;
//   border: solid 1px #ccc;
//   border-radius: 5px;
//   padding: 0 10px;
//   width: 500px;
//   height: 40px;
//   font-size: 1.6rem;
// `

// const TextArea = styled.textarea`
//   background-color: #fff;
//   border: solid 1px #ccc;
//   border-radius: 5px;
//   padding: 10px;
//   width: 500px;
//   height: 300px;
//   font-size: 1.6rem;
// `

const Text = styled.div`
  width: 100%;
  font-size: 1.6rem;
  line-height: 30px;
`

// const Button = styled.button`
//   border: none;
//   border-radius: 5px;
//   background-color: ${ Color.PRIMARY };
//   padding: 0 15px;
//   height: 40px;
//   line-height: 40px;
//   font-size: 1.6rem;
//   font-weight: bold;
//   color: #fff;
//   cursor: pointer;
// `