import React, { Component } from 'react';
import styled from 'styled-components';
import Color from '../const/Color';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      isClosed: false
    };
  }

  handleClick = () => {
    this.setState({
      isClosed: true
    });
  }

  render() {
    return(
      <Root isClosed={ this.state.isClosed }>
        <Text>{ this.props.text }</Text>
        <Button onClick={ this.handleClick }>閉じる</Button>
      </Root>
    );
  }
}

export default Message;

const Root = styled.div`
  display: ${ props => props.isClosed ? 'none' : 'flex' };
  justify-content: space-between;
  margin-bottom: 50px;
  background-color: ${ Color.SUCCESS };
  padding: 10px;
  width: 100%;
`

const Text = styled.p`
  font-size: 1.6rem;
  color: #fff;
`

const Button = styled.p`
  font-size: 1.6rem;
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`