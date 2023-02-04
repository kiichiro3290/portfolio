import React from 'react'
import { Provider } from 'react-redux'
import { getBaseLayout } from '~/component/layout/base'

import { TopPage } from '~/component/pages/top/top'
import { store } from '~/store'
import { NextPageWithLayout } from '~/types/next'

const Top: NextPageWithLayout = () => {
  return (
    <Provider store={store}>
      <TopPage />
    </Provider>
  )
}

Top.getLayout = getBaseLayout

export default Top
