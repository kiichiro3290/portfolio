import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Popover,
  Avatar,
  Paper,
  Grid,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { MenuIcon } from '~/component/parts/MenuIcon/MenuIcon'
import { selectTheme } from '~/store/theme'
import { usePopOver } from '../hooks/usePopOver'
import Image from 'next/image'

export const ApplicationBar: React.FC = () => {
  const { account, app } = usePopOver()
  const theme = useSelector(selectTheme)

  return (
    <Box
      sx={{
        px: theme.spacing(1),
        width: '100vw',
        height: theme.spacing(4),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: theme.spacing(2),
      }}
    >
      <Typography
        sx={{
          fontSize: theme.spacing(2),
        }}
      >
        mail
      </Typography>
      <Typography
        sx={{
          fontSize: theme.spacing(2),
        }}
      >
        画像
      </Typography>
      <IconButton onClick={app.handleClickAppPopOver} size='large'>
        <Image src='/images/nine-dots.svg' alt='' height='16px' width='16px' />
      </IconButton>
      <Popover
        anchorEl={app.anchorAppPopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={app.handleCloseAppPopOver}
        open={app.openAppPopOver}
      >
        <ApplicationMenuPopOver />
      </Popover>

      <IconButton onClick={account.handleClickPopOver}>
        <Avatar>
          <Typography>K</Typography>
        </Avatar>
      </IconButton>
      <Popover
        anchorEl={account.anchorPopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={account.handleClosePopOver}
        open={account.openPopOver}
      >
        <AccountMenuPopOver />
      </Popover>
    </Box>
  )
}

export const AccountMenuPopOver: React.FC = () => {
  const theme = useSelector(selectTheme)

  return (
    <Paper sx={{ p: theme.spacing(2) }}>
      <Typography>準備中...</Typography>
    </Paper>
  )
}

export const ApplicationMenuPopOver: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Paper sx={{ p: theme.spacing(2) }}>
      <Grid container>
        <Grid item>
          <MenuIcon type='アカウント' />
        </Grid>
        <Grid item>
          <MenuIcon type='記事' />
        </Grid>
      </Grid>
    </Paper>
  )
}
