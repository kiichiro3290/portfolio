'use client'

import React from 'react'
import { Search } from '@mui/icons-material'
import { Paper, InputBase } from '@mui/material'
import { theme } from '../../../../theme'

export const SearchWindow: React.FC = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: theme.spacing(6),
        p: theme.spacing(2),
        borderRadius: theme.spacing(4),
        width: '100%',
        gap: theme.spacing(2),
      }}
    >
      <Search />
      <InputBase placeholder='検索または URL を入力' />
    </Paper>
  )
}
