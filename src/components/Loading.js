import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = props => {
  return(
    <Root isLoading={props.isLoading}>
      <Icon icon="circle-notch" spin />
      <Text>{ props.text }</Text>
    </Root>
  );
}

Loading.defaultProps = {
  isLoading: false,
  text: '処理中'
};

export default Loading;

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => props.isLoading ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
`

const Icon = styled(FontAwesomeIcon)`
  margin-bottom: 20px;
  font-size: 5rem;
  color: #fff;
`

const Text = styled.p`
  font-size: 2rem;
  color: #fff;
`