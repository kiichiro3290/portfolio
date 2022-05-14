import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const MyDocument: React.FC = () => {
  return (
    <Html lang='ja'>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
