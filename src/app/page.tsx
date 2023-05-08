import React from 'react'
import { TopPage } from 'src/app/component/pages/top/Top'

import { Head } from './head'
import RootLayout from './layout'

const Top: React.FC = () => {
  return (
    <RootLayout>
      <Head />
      <TopPage />
    </RootLayout>
  )
}

export default Top
