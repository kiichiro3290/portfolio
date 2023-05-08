'use client'

import React from 'react'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { FC, Fragment, ReactNode } from 'react'
import { Header } from './parts/Header'
import { theme } from '../../theme'

type BaseLayoutProps = {
  children: ReactNode
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Fragment>{children}</Fragment>
    </ThemeProvider>
  )
}
