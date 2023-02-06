import React from 'react'
import { Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { PageObjectSerialized } from '~/types/notion/page'

type TitleWrapperProps = {
  page: PageObjectSerialized
}

export const TitleWrapper: React.FC<TitleWrapperProps> = ({ page }) => {
  const theme = useSelector(selectTheme)
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
