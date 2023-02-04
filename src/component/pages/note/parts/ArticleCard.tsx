import React from 'react'
import { Card, Box, Chip, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'

export type ArticleCardProps = {
  lastEdittedAt: string
  title: string
  emoji: string
  tag: string
}
export const ArticleCard: React.FC<ArticleCardProps> = ({
  lastEdittedAt,
  title,
  emoji,
  tag,
}) => {
  const theme = useSelector(selectTheme)

  return (
    <Card
      sx={{
        width: '240px',
        borderRadius: theme.spacing(1.5),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component='div'
        sx={{
          p: theme.spacing(1),
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Chip label={tag ? tag : '?'} variant='filled' size='small' />
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ lineHeight: theme.spacing(4) }}>
            {emoji ? emoji : '😀'}
          </Typography>
        </Box>
      </Box>
      <Box
        component='div'
        sx={{
          p: theme.spacing(1),
          display: 'block',
          flexDirection: 'column',
        }}
      >
        <Typography
          component='h3'
          sx={{
            // 複数行３点リーダー
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,

            height: theme.spacing(6),
            maxHeight: theme.spacing(6),
            fontSize: theme.spacing(1.8),
            fontWeight: 'bold',
            lineHeight: theme.spacing(2),
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        component='div'
        sx={{
          p: theme.spacing(1),
          display: 'flex',
          gap: theme.spacing(1),
          alignItems: 'end',
          color: theme.palette.text.disabled,
        }}
      >
        <Typography variant='overline' fontSize={theme.spacing(0.5)}>
          {lastEdittedAt}
        </Typography>
        <Typography variant='overline' fontSize={theme.spacing(0.5)}>
          いいね
        </Typography>
      </Box>
    </Card>
  )
}
