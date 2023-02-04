import { AppPropsWithLayout } from '~/types/next'

import React, { Fragment } from 'react'

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })

  return <Fragment>{getLayout(<Component {...pageProps} />)}</Fragment>
}

export default MyApp
