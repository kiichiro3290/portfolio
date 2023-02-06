import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { getBaseLayout } from '~/component/layout/base'

import { store } from '~/store'
import { NextPageWithLayout } from '~/types/next'

import { useRouter } from 'next/router'
import { NoteContentsPage } from '~/component/pages/noteContents/NoteContents'

const NoteContents: NextPageWithLayout = () => {
  const router = useRouter()
  const { pageId } = router.query

  return (
    <Provider store={store}>
      <Head>
        <title>記事</title>
        <meta content='Article' name='Article' />
        <link href='/images/nine-dots.svg' rel='icon' />
      </Head>
      <NoteContentsPage pageId={pageId as string} />
    </Provider>
  )
}

NoteContents.getLayout = getBaseLayout

export default NoteContents
