import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      placeholder="Pesquisar"
      value={filter || ''}
      onChange={e => setFilter(e.target.value)}
    />
  )
}