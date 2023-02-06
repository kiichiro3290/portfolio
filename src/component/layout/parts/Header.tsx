import React from 'react'
import { Box } from '@mui/material'
import { ApplicationBar } from '~/component/layout/parts/ApplicationBar'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { BookMarkBar } from './BookMarkBar'

export const Header: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        top: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <BookMarkBar />
      <ApplicationBar />
    </Box>
  )
}
