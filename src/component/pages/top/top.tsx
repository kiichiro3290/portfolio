import React from 'react'
import Image from 'next/image'
import {
  Avatar,
  Box,
  InputBase,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Search } from '@mui/icons-material'
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
                width='16px'
                height='16px'
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
          <Image
            src='/images/nine-dots.svg'
            alt=''
            height='16px'
            width='16px'
          />
          <Avatar>
            <Typography>K</Typography>
          </Avatar>
        </Box>
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
      </Container>
    </Box>
  )
}
