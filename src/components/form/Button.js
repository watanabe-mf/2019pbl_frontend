import React from 'react';
import styled from 'styled-components';

const Button = props => (
  <Root onClick={ props.onClick } width={ props.width }>
    { props.text }
  </Root>
);

export default Button;

Button.defaultProps = {
  width: '400px'
};

const Root = styled.button`
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 5px;
  padding: 0 10px;
  width: ${ props => props.width };
  height: 40px;
  font-size: 1.6rem;
  cursor: pointer;
`