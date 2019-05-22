import React from 'react';
import styled from 'styled-components';

const InputText = props => (
  <Root type="text" name={ props.name } value={ props.value } placeholder={ props.placeholder } width={ props.width } onChange={ props.onChange } />
);

export default InputText;

InputText.defaultProps = {
  width: '400px'
};

const Root = styled.input`
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 5px;
  padding: 0 10px;
  width: ${ props => props.width };
  height: 40px;
  font-size: 1.6rem;
`