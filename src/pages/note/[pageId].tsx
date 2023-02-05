import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { getBaseLayout } from '~/component/layout/base'

import { store } from '~/store'
import { NextPageWithLayout } from '~/types/next'
import { ArticlePage } from '~/component/pages/article/article'

const Article: NextPageWithLayout = () => {
  return (
    <Provider store={store}>
      <Head>
        <title>記事</title>
        <meta content='Article' name='Article' />
        <link href='/images/nine-dots.svg' rel='icon' />
      </Head>
      <ArticlePage />
    </Provider>
  )
}

Article.getLayout = getBaseLayout

export default Article
