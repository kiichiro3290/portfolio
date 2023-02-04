import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, useMediaQuery } from '@mui/material'
import { FC, Fragment, ReactNode, useEffect } from 'react'
import { lightTheme } from '~/theme'
import { GetLayout } from '~/types/next'

type BaseLayoutProps = {
  children: ReactNode
}

export const getBaseLayout: GetLayout = (page) => <BaseLayout>{page}</BaseLayout>

const BaseLayout: FC<BaseLayoutProps> = (props) => {
  return <Layout {...props} />
}

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  // デバイスのモードを取得する
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    // TODO: themeの変更
  }, [prefersDarkMode])

  const theme = lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fragment>{children}</Fragment>
    </ThemeProvider>
  )
}
