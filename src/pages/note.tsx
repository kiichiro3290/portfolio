import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { getBaseLayout } from '~/component/layout/base'

import { store } from '~/store'
import { NextPageWithLayout } from '~/types/next'
import { NotePage } from '~/component/pages/note/note'

const Note: NextPageWithLayout = () => {
  return (
    <Provider store={store}>
      <Head>
        <title>Note</title>
        <meta content='Note' name='Note' />
        <link href='/images/nine-dots.svg' rel='icon' />
      </Head>
      <NotePage />
    </Provider>
  )
}

Note.getLayout = getBaseLayout

export default Note
