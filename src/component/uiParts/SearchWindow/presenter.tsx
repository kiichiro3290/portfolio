import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export type SearchWindowProps = {
  message?: string
}

export const SearchWindowPresenter: React.FC<SearchWindowProps> = ({ message }) => {
  return (
    <InputGroup w='35%'>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.400' />
      </InputLeftElement>
      <Input rounded='full' placeholder={message}></Input>
    </InputGroup>
  )
}
