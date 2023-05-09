import { Fragment } from 'react'
import { ArticleContentsPage } from '~/components/pages/articleContents/ArticleContents'
import { notionApi } from '~/lib/client/notion'
import { ArticleHead } from '../head'

type ArticleContentsProps = {
  params: {
    pageId: string
  }
}

export default async function ArticleContents({
  params,
}: ArticleContentsProps) {
  const pageId = params.pageId
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
  const blocks = await notionApi.getBlocks({ pageId })
  const pages = await notionApi.getPages({ databaseId })
  const page = pages.filter((row: Page) => row.id == pageId)[0]

  return (
    <Fragment>
      <ArticleHead />
      <ArticleContentsPage blocks={blocks} page={page} />
    </Fragment>
  )
}
