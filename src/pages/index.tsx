import React from 'react'
import { getBaseLayout } from '~/component/layout/base'

import { TopPage } from '~/component/pages/index'
import { NextPageWithLayout } from '~/types/next'

const Top: NextPageWithLayout = () => {
  return <TopPage />
}

Top.getLayout = getBaseLayout

export default Top
