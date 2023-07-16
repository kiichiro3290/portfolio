import { Fragment } from 'react'
import { ArticleHead } from '../head'

type ArticleContentsProps = {
  params: {
    pageId: string
  }
}

export default async function ArticleContents() {
  return (
    <Fragment>
      <ArticleHead />
      {/* <ArticleContentsPage blocks={blocks} page={page} /> */}
    </Fragment>
  )
}
