import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ToolCard = props => (
  <Root to={ props.to }>{ props.value }</Root>
);

export default ToolCard;

const Root = styled(Link)`
  display: block;
  border-radius: 5px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  width: 300px;
  font-size: 3rem;
  font-weight: bold;
  color: #333;
`