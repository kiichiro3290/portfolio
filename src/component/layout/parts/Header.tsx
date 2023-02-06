import React from 'react'
import { Box } from '@mui/material'
import { ApplicationBar } from '~/component/pages/top/parts/ApplicationBar'
import { BookMarkBar } from '~/component/pages/top/parts/BookMarkBar'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'

export const Header: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        top: 0,
      }}
    >
      <BookMarkBar />
      <ApplicationBar />
    </Box>
  )
}
