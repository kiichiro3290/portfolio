import { useParams } from 'next/navigation'
import { ArticleContentsPage } from '~/components/pages/articleContents/ArticleContents'
import { ArticleHead } from '../head'

const ArticleContents: React.FC = () => {
  const params = useParams()

  return (
    <>
      <ArticleHead />
      <ArticleContentsPage pageId={params?.pageId as string} />
    </>
  )
}

export default ArticleContents
