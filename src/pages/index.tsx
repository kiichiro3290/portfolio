import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { getBaseLayout } from '~/component/layout/base'

import { TopPage } from '~/component/pages/top/top'
import { store } from '~/store'
import { NextPageWithLayout } from '~/types/next'

const Top: NextPageWithLayout = () => {
  return (
    <Provider store={store}>
      <Head>
        <title>Home</title>
        <meta content='HOME' name='HOME' />
        <link href='/images/nine-dots.svg' rel='icon' />
      </Head>
      <TopPage />
    </Provider>
  )
}

Top.getLayout = getBaseLayout

export default Top
