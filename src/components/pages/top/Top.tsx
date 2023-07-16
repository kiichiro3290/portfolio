'use client'

import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import Image from 'next/image'
import { Box, Grid } from '@mui/material'
import { Container } from '@mui/material'
import { SearchWindow } from './parts/SearchWindow'
import { useRouter } from 'next/navigation'
import { theme } from '../../../theme'
import { MenuIcon } from '../../parts/MenuIcon/MenuIcon'

export const TopPage: React.FC = () => {
  const router = useRouter()

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
              onClick={() => router.push('/article')}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
