'use client'

import React from 'react'
import { Search } from '@mui/icons-material'
import { Paper, InputBase } from '@mui/material'

export const SearchWindow: React.FC = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '24px',
        p: '4px',
        borderRadius: '4px',
        width: '100%',
        gap: '4px',
      }}
    >
      <Search />
      <InputBase
        sx={
          {
            // color: theme.palette.text.primary,
          }
        }
        placeholder='検索または URL を入力'
      />
    </Paper>
  )
}
