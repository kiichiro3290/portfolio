import React from 'react'
import { Box, Typography, Divider, Alert, Link } from '@mui/material'
import { BlockType } from '../types/notionBlocks'

export const useConvertNotionWithReactComponent = () => {
  const convertNotionWithReactComponent = (
    type: BlockType,
    content: string
  ) => {
    switch (type) {
      case 'heading_1': {
        const res = (
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Typography variant='h4' component='h2'>
              {content}
            </Typography>
            <Divider />
          </Box>
        )
        return res
      }
      case 'heading_2': {
        const res = (
          <Typography variant='h5' component='h3'>
            {content}
          </Typography>
        )
        return res
      }
      case 'heading_3': {
        const res = (
          <Typography variant='h6' component='h4'>
            {content}
          </Typography>
        )
        return res
      }
      case 'paragraph': {
        const res = (
          <Typography variant='body1' component='p'>
            {content}
          </Typography>
        )
        return res
      }
      case 'numbered_list_item': {
        const res = (
          <ol>
            <li>{content}</li>
          </ol>
        )
        return res
      }
      case 'bulleted_list_item': {
        const res = (
          <ul>
            <li>{content}</li>
          </ul>
        )
        return res
      }
      case 'to_do': {
        const res = (
          <ul>
            <li>{content}</li>
          </ul>
        )
        return res
      }
      case 'divider': {
        const res = <Divider />
        return res
      }
      case 'quote': {
        const res = (
          <Box
            sx={{
              borderLeft: 'solid',
              pl: '8px',
            }}
          >
            <Typography component='p' variant='body1'>
              {content}
            </Typography>
          </Box>
        )
        return res
      }
      case 'callout': {
        const res = (
          <Alert severity='info'>
            <Typography component='p' variant='body1'>
              {content}
            </Typography>
          </Alert>
        )
        return res
      }
      case 'code': {
        const res = (
          <Alert severity='info'>
            <Typography component='p' variant='body1'>
              {content}
            </Typography>
          </Alert>
        )
        return res
      }
      case 'bookmark': {
        const res = (
          <Link href={content} underline='none'>
            ブックマーク
          </Link>
        )
        return res
      }
      default: {
        return null
      }
    }
  }

  return { convertNotionWithReactComponent }
}
