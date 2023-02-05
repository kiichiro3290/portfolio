import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { Container } from '@mui/material'
import { SearchWindow } from './parts/SearchWindow'
import { ApplicationBar } from './parts/ApplicationBar'
import { BookMarkBar } from './parts/BookMarkBar'

export const TopPage: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box component='div' width='100vw' height='100vh'>
      <Box
        component='div'
        sx={{
          width: '100%',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
        }}
      >
        <BookMarkBar />
        <ApplicationBar />
      </Box>

      <Container
        maxWidth='sm'
        sx={{
          py: {
            xs: theme.spacing(24),
          },
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(4),
        }}
      >
        <Box component='div'>
          <Image
            src='/images/Kiichiro.svg'
            alt=''
            height='80px'
            width='300px'
          />
        </Box>
        <SearchWindow />
      </Container>
    </Box>
  )
}
