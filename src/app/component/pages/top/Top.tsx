'use client'

import React from 'react'
import Image from 'next/image'
import { Box, Grid } from '@mui/material'
import { Container } from '@mui/material'
import { SearchWindow } from './parts/SearchWindow'
import router from 'next/router'
import { MenuIcon } from '~/component/parts/MenuIcon/MenuIcon'
import { theme } from '~/theme'

export const TopPage: React.FC = () => {
  return (
    <Box component='div' width='100vw' height='100vh'>
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
          <Image src='/images/Kiichiro.svg' alt='' height={80} width={300} />
        </Box>
        <SearchWindow />
        <Grid container>
          <Grid item xs={2}>
            <MenuIcon
              type='ドキュメント'
              onClick={() => router.push('/note')}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
