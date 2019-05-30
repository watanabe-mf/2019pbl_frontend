import React from 'react';
import styled from 'styled-components';

const Tag = props => (
  <Root>{ props.text }</Root>
);

const Root = styled.span`
  display: inline-block;
  margin: 5px;
  border: solid 1px #ccc;
  border-radius: 15px;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  font-size: 1.6rem;
`

export default Tag;