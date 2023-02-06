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
import { usePopOver } from '../../pages/top/hooks/usePopOver'
import { useRouter } from 'next/router'
import { Apps } from '@mui/icons-material'

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
        <Apps />
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
  const router = useRouter()
  return (
    <Paper sx={{ p: theme.spacing(2), width: theme.spacing(38) }}>
      <Grid container gap={2}>
        <Grid item xs={4}>
          <MenuIcon type='アカウント' onClick={() => router.push('/')} />
        </Grid>
        <Grid item xs={4}>
          <MenuIcon type='ドキュメント' onClick={() => router.push('/note')} />
        </Grid>
      </Grid>
    </Paper>
  )
}
