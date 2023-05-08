import { Fragment } from 'react'
import { ArticleContentsPage } from '~/components/pages/articleContents/ArticleContents'
import { ArticleHead } from '../head'

type ArticleContentsProps = {
  params: {
    pageId: string
  }
}

const ArticleContents: React.FC<ArticleContentsProps> = ({ params }) => {
  return (
    <Fragment>
      <ArticleHead />
      <ArticleContentsPage pageId={params?.pageId as string} />
    </Fragment>
  )
}

export default ArticleContents
