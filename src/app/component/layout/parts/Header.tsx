import React from 'react'
import { Box } from '@mui/material'
import { ApplicationBar } from '~/component/layout/parts/ApplicationBar'
import { BookMarkBar } from './BookMarkBar'
import { theme } from '~/theme'

export const Header: React.FC = () => {
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
