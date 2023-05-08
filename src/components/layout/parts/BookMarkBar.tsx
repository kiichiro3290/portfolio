'use client'

import React from 'react'

import { Box, Typography, Link } from '@mui/material'
import Image from 'next/image'
import { theme } from '../../../app/theme'

export const BookMarkBar: React.FC = () => {
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
            alt='github-icon'
            width={16}
            height={16}
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
