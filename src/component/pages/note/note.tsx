import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { ArticleCard } from './parts/ArticleCard'

export const NotePage: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box component='div' width='100vw' height='100vh'>
      <ArticleCard />
    </Box>
  )
}
