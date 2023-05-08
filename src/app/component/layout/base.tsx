import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { FC, Fragment, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './parts/Header'
import { theme } from '~/theme'

type BaseLayoutProps = {
  children: ReactNode
}

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Layout {...props} />
    </QueryClientProvider>
  )
}

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Fragment>{children}</Fragment>
    </ThemeProvider>
  )
}
