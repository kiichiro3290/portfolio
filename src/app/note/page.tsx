import { Fragment } from 'react'
import { NoteList } from '../../components/pages/noteList/NoteList'
import { notionApi } from '../../lib/client/notion'

import { NoteHead } from './head'

export default async function NoteListPage() {
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
  const pages = await notionApi.getPages({ databaseId })

  return (
    <Fragment>
      <NoteHead />
      <NoteList pages={pages} />
    </Fragment>
  )
}
