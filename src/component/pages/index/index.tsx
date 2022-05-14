import { SearchIcon } from '@chakra-ui/icons'
import { Text, Flex, Input, InputGroup, InputLeftElement, Circle, Center } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'

export const TopPage: React.FC = () => {
  return (
    <Flex w='100vw' h='100vh'>
      <Flex
        position='fixed'
        top={0}
        h='9'
        w='full'
        px='2'
        borderBottom='1px'
        borderColor='gray.300'
        bgColor='white'
        direction='row'
        align='center'
      >
        <a href='https://github.com/kiichiro3290' target='_blank' rel='noreferrer'>
          <Flex direction='row' align='center'>
            <Image src='/images/GitHub-Mark-32px.png' alt='' width='16px' height='16px' />
            <Text fontSize='xs' pl='2'>
              kiichiro3290
            </Text>
          </Flex>
        </a>
      </Flex>
      <Flex w='full'>
        <Flex w='full' direction='column'>
          <Flex pt='9' w='full' h='20'>
            <Flex px='6' w='full' h='14' direction='row' align='center' justify='end'>
              <Text fontSize='sm' pr='4'>
                mail
              </Text>
              <Text fontSize='sm' pr='6'>
                画像
              </Text>
              <Image src='/images/nine-dots.svg' alt='' height='16px' width='16px'></Image>
              <Circle ml='6' size='32px' bg='cyan.400' color='white'>
                <Text>K</Text>
              </Circle>
            </Flex>
          </Flex>
          <Flex py='48' align='center' direction='column'>
            <Center w='full' my='8'>
              <Image src='/images/Kiichiro.svg' alt='' height='80px' width='300px' />
            </Center>
            <InputGroup w='35%'>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.400' />
              </InputLeftElement>
              <Input rounded='full' placeholder='検索または URL を入力'></Input>
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
