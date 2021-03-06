import React from 'react';

const Datetime = props => {
  const date = new Date(props.target);
  const YYYY = date.getFullYear();
  const MM = ('0' + (date.getMonth() + 1)).slice(-2);
  const DD = ('0' + date.getDate()).slice(-2);
  const hh = ('0' + date.getHours()).slice(-2);
  const mm = ('0' + date.getMinutes()).slice(-2);
  const ss = ('0' + date.getSeconds()).slice(-2);

  return(
    <React.Fragment>{`${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`}</React.Fragment>
  );
}

export default Datetime;