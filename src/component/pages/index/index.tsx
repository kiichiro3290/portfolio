import { Text, Flex, Circle, Center } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { SearchWindow } from '~/component/uiParts/SearchWindow'
import { BookmarkContents } from '~/component/uiParts/BookmarkContents'

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
        <BookmarkContents
          linkIcon='github.png'
          linkUrl='https://github.com/kiichiro3290'
          text='kiichiro3290'
        ></BookmarkContents>
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
            <SearchWindow message='検索または URL を入力'></SearchWindow>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
