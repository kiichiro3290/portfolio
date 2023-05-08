'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { BaseLayout } from './component/layout/base'

type Props = {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <BaseLayout>
      <CssBaseline />
      {children}
    </BaseLayout>
  )
}

export default RootLayout
