import React from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { BlocksObjectSerialized } from 'src/types/notion/block'
import { theme } from '~/theme'

type TableOfContentsProps = {
  data: BlocksObjectSerialized[]
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ data }) => {
  return (
    <Paper
      sx={{
        p: theme.spacing(4),
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <Typography variant='h4' component='p'>
        目次
      </Typography>
      <Box component='div'>
        <Box
          component='ul'
          sx={{
            borderLeft: 'solid',
            borderColor: theme.palette.primary.light,
            pl: theme.spacing(1.8),
          }}
        >
          {data?.map((block, id) => {
            if (block.type == 'heading_1') {
              return <Heading1List key={id} content={block.content ?? ''} />
            } else if (block.type == 'heading_2') {
              return <Heading2List key={id} content={block.content ?? ''} />
            }
          })}
        </Box>
      </Box>
    </Paper>
  )
}

type Heading1ListProps = {
  content: string
}

const Heading1List: React.FC<Heading1ListProps> = ({ content }) => {
  return (
    <Box
      component='li'
      sx={{
        listStyleType: 'none',
        borderColor: theme.palette.primary.main,
        '::before': {
          position: 'relative',
          top: theme.spacing(3.5),
          left: `-${theme.spacing(3)}`,

          display: 'inline-block',

          width: theme.spacing(2),
          height: theme.spacing(2),

          content: '""',

          borderRadius: '100%',
          bgcolor: theme.palette.primary.main,
        },
      }}
    >
      <Typography variant='h6'>{content}</Typography>
    </Box>
  )
}

type Heading2ListProps = {
  content: string
}
const Heading2List: React.FC<Heading2ListProps> = ({ content }) => {
  return (
    <Box
      component='li'
      sx={{
        listStyleType: 'none',
        '::before': {
          position: 'relative',
          top: theme.spacing(2.6),
          left: `-${theme.spacing(2.6)}`,

          display: 'inline-block',

          width: theme.spacing(1),
          height: theme.spacing(1),

          content: '""',

          borderRadius: '100%',
          bgcolor: theme.palette.primary.main,
        },
      }}
    >
      <Typography>{content}</Typography>
    </Box>
  )
}
