import React from 'react'
import { Search } from '@mui/icons-material'
import { Paper, InputBase } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'

export const SearchWindow: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: theme.spacing(4),
        p: theme.spacing(2.5),
        borderRadius: theme.spacing(4),
        width: '100%',
        gap: theme.spacing(2),
      }}
    >
      <Search />
      <InputBase
        sx={{
          color: theme.palette.text.primary,
        }}
        placeholder='検索または URL を入力'
      />
    </Paper>
  )
}
