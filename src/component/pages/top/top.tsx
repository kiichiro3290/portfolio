import React, { useState } from 'react'
import Image from 'next/image'
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Link,
  Paper,
  Popover,
  Typography,
} from '@mui/material'
import { NoteOutlined, Search } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { Container } from '@mui/material'

export const TopPage: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box component='div' width='100vw' height='100vh'>
      <Box
        component='div'
        sx={{
          width: '100%',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
        }}
      >
        <BookMarkBar />
        <ApplicationBar />
      </Box>

      <Container
        maxWidth='sm'
        sx={{
          py: {
            md: theme.spacing(24),
            sx: theme.spacing(12),
          },
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(4),
        }}
      >
        <Box component='div'>
          <Image
            src='/images/Kiichiro.svg'
            alt=''
            height='80px'
            width='300px'
          />
        </Box>
        <SearchWindow />
      </Container>
    </Box>
  )
}

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

export const BookMarkBar: React.FC = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{
        px: theme.spacing(2),
        width: '100%',
        height: theme.spacing(4),

        borderBottom: 'solid',
        borderWidth: theme.spacing(0.2),
        borderColor: theme.palette.divider,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Link
        href='https://github.com/kiichiro3290'
        target='_blank'
        rel='noreferrer'
        underline='none'
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(1),
          }}
        >
          <Image
            src='/images/GitHub-Mark-32px.png'
            alt=''
            width={theme.spacing(2)}
            height={theme.spacing(2)}
          />
          <Typography
            sx={{
              fontSize: theme.spacing(1),
              color: theme.palette.text.primary,
            }}
          >
            kiichiro3290
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}

export const ApplicationBar: React.FC = () => {
  const [anchorPopOver, setAnchorPopOver] = useState<HTMLButtonElement | null>(
    null
  )
  const handleClickPopOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPopOver(e.currentTarget)
  }
  const handleClosePopOver = () => {
    setAnchorPopOver(null)
  }
  const openPopOver = Boolean(anchorPopOver)

  const [anchorAppPopOver, setAnchorAppPopOver] =
    useState<HTMLButtonElement | null>(null)
  const handleClickAppPopOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorAppPopOver(e.currentTarget)
  }
  const handleCloseAppPopOver = () => {
    setAnchorAppPopOver(null)
  }
  const openAppPopOver = Boolean(anchorAppPopOver)

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
      <IconButton onClick={handleClickAppPopOver} size='large'>
        <Image src='/images/nine-dots.svg' alt='' height='16px' width='16px' />
      </IconButton>
      <Popover
        anchorEl={anchorAppPopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleCloseAppPopOver}
        open={openAppPopOver}
      >
        <ApplicationMenuPopOver />
      </Popover>

      <IconButton onClick={handleClickPopOver}>
        <Avatar>
          <Typography>K</Typography>
        </Avatar>
      </IconButton>
      <Popover
        anchorEl={anchorPopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClosePopOver}
        open={openPopOver}
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
          {/* <IconButton
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(1),
            }}
          >
            <Avatar>
              <Typography>K</Typography>
            </Avatar>
            <Typography>アカウント</Typography>
          </IconButton> */}
        </Grid>
        <Grid item>
          <IconButton
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(1),
            }}
          >
            <Avatar>
              <NoteOutlined />
            </Avatar>
            <Typography>記事</Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}
