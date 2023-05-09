'use client'

import { Paper, Typography, Box } from '@mui/material'
import { theme } from '../../../../theme'

type TableOfContentsProps = {
  data: Block[]
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
            if (block.heading1) {
              return (
                <Heading1List
                  key={id}
                  content={block.heading1.richTexts[0].plainText ?? ''}
                />
              )
            } else if (block.heading2) {
              return (
                <Heading2List
                  key={id}
                  content={block.heading2.richTexts[0].plainText ?? ''}
                />
              )
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
