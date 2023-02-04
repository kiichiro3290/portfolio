import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, useMediaQuery } from '@mui/material'
import { FC, Fragment, ReactNode, useEffect } from 'react'
import { lightTheme } from '~/theme'
import { GetLayout } from '~/types/next'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '~/store'
import { selectTheme, setMode } from '~/store/theme'

type BaseLayoutProps = {
  children: ReactNode
}

export const getBaseLayout: GetLayout = (page) => (
  <BaseLayout>{page}</BaseLayout>
)

const BaseLayout: FC<BaseLayoutProps> = (props) => {
  return <Layout {...props} />
}

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // デバイスのモードを取得する
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    dispatch(setMode(prefersDarkMode ? 'dark' : 'light'))
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fragment>{children}</Fragment>
    </ThemeProvider>
  )
}
