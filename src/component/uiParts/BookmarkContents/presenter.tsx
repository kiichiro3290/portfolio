import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export type linkIconSrcTypes = 'github.png'

export type BookmarkContentsProps = {
  linkUrl: string
  text: string
  linkIcon: linkIconSrcTypes
}

export const BookmarkContentsPresenter: React.FC<BookmarkContentsProps> = ({ linkUrl, text, linkIcon }) => {
  return (
    <a href={linkUrl} target='_blank' rel='noreferrer'>
      <Flex direction='row' align='center'>
        <Image src={`/images/${linkIcon}`} alt='' width='16px' height='16px' />
        <Text fontSize='xs' pl='2'>
          {text}
        </Text>
      </Flex>
    </a>
  )
}
