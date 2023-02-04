import { NoteOutlined } from '@mui/icons-material'
import { Typography, IconButton, Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'

export type MenuIconProps = {
  onClick?: () => void
  type: MenuType
}

export type MenuType = '記事' | 'アカウント'

export const MenuIcon: React.FC<MenuIconProps> = ({ onClick, type }) => {
  const generateIcon = (type: MenuType) => {
    switch (type) {
      case 'アカウント':
        return <Typography>K</Typography>
      case '記事':
        return <NoteOutlined />
      default:
        return <Typography>K</Typography>
    }
  }
  const theme = useSelector(selectTheme)
  return (
    <IconButton
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
      }}
      onClick={onClick}
    >
      <Avatar>{generateIcon(type)}</Avatar>
      <Typography>{type}</Typography>
    </IconButton>
  )
}
