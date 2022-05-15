import React from 'react'
import { SearchWindowPresenter, SearchWindowProps } from './presenter'

export const SearchWindow: React.FC<SearchWindowProps> = (props) => {
  return <SearchWindowPresenter {...props} />
}
