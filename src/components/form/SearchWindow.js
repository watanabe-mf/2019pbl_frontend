import React from 'react';
import styled from 'styled-components';

const SearchWindow = props => (
  <Root value={ props.value } placeholder={ props.placeholder } onChange={ props.onChange } width={ props.width } />
)

export default SearchWindow;

SearchWindow.defaultProps = {
  width: '800px'
}

const Root = styled.input`
  width: ${ props => props.width };
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 20px;
  padding: 20px;
  font-size: 2rem;
  outline: 0;

  &:focus {
    border: solid 3px #ccc;
  }
`