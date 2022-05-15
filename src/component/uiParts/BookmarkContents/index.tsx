import React from 'react'
import { BookmarkContentsPresenter, BookmarkContentsProps } from './presenter'

export const BookmarkContents: React.FC<BookmarkContentsProps> = (props) => {
  return <BookmarkContentsPresenter {...props} />
}
