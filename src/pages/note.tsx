import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { getBaseLayout } from '~/component/layout/base'

import { store } from '~/store'
import { NextPageWithLayout } from '~/types/next'
import { NoteListPage } from '~/component/pages/noteList/NoteList'

const NoteList: NextPageWithLayout = () => {
  return (
    <Provider store={store}>
      <Head>
        <title>Note</title>
        <meta content='Note' name='Note' />
        <link href='/images/nine-dots.svg' rel='icon' />
      </Head>
      <NoteListPage />
    </Provider>
  )
}

NoteList.getLayout = getBaseLayout

export default NoteList
