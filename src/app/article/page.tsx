import { Fragment } from 'react'
import { ArticleList } from '~/ui/pages/articleList/ArticleList'
import { notionApi } from '../../lib/client/notion'

import { ArticleHead } from './head'

export default async function ArticleListPage() {
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
  const pages = await notionApi.getPages({ databaseId })

  return (
    <Fragment>
      <ArticleHead />
      <ArticleList pages={pages} />
    </Fragment>
  )
}
