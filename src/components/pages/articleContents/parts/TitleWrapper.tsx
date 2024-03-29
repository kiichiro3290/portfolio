'use client'

import { Container, Typography } from '@mui/material'
import { theme } from '../../../../theme'

type TitleWrapperProps = {
  page: Page
}

export const TitleWrapper: React.FC<TitleWrapperProps> = ({ page }) => {
  return (
    <Container maxWidth='md'>
      <Typography
        variant='h4'
        component='h1'
        sx={{ textAlign: 'center', mb: theme.spacing(2) }}
      >
        {page?.emoji ? page?.emoji : '😃'}
      </Typography>
      <Typography
        variant='h4'
        component='h1'
        sx={{ textAlign: 'center', mb: theme.spacing(8) }}
      >
        {page?.title ? page?.title : '無タイトル'}
      </Typography>
    </Container>
  )
}
