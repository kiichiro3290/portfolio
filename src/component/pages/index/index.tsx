import { Box, Flex, Input } from '@chakra-ui/react'
import React from 'react'

export const TopPage: React.FC = () => {
  return (
    <Flex>
      <Flex as='header' bg='gray.400' position='fixed' top={0} width='full' shadow='sm' py={4} px={8}></Flex>
      <Box>
        <Input placeholder='Basic Usage' />
      </Box>
    </Flex>
  )
}
