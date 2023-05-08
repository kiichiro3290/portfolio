import React from 'react'

import { NextPageWithLayout } from 'src/types/next'
import { NoteListPage } from 'src/app/component/pages/noteList/NoteList'
import { NoteHead } from './head'

const NoteList: NextPageWithLayout = () => {
  return (
    <>
      <NoteHead />
      <NoteListPage />
    </>
  )
}

export default NoteList
