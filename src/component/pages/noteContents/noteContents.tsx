import React, { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionApi } from '~/api/client/notion'
import { parseNotionBlocksData } from './utils/parseNotionBlocksData'
import { BlocksObjectSerialized, BlockType } from './types/notionBlocks'

type NoteContentsPageProps = {
  pageId: string
}

const convertNotionWithReactComponent = (type: BlockType, content: string) => {
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

export const NoteContentsPage: React.FC<NoteContentsPageProps> = ({
  pageId,
}) => {
  const theme = useSelector(selectTheme)
  const [blocks, setBlocks] = useState<BlocksObjectSerialized[]>()

  // データベース内のページを取得
  useEffect(() => {
    if (!pageId) return

    const f = async () => {
      const res = await notionApi.getBlocks({ pageId })
      console.log(res)
      const parsedRes = parseNotionBlocksData(
        res.results as Array<BlockObjectResponse>
      )
      setBlocks(parsedRes)
    }
    f()
  }, [pageId])

  return (
    <Box component='div' width='100vw' height='100vh'>
      <Box
        component='div'
        sx={{
          height: { md: theme.spacing(12), sm: theme.spacing(6) },
          backgroundColor: theme.palette.background.paper,
        }}
      ></Box>
      <Container maxWidth='md' sx={{ pt: theme.spacing(8) }}>
        <Typography
          variant='h4'
          component='h1'
          sx={{ textAlign: 'center', mb: theme.spacing(2) }}
        >
          😃
        </Typography>
        <Typography
          variant='h4'
          component='h1'
          sx={{ textAlign: 'center', mb: theme.spacing(8) }}
        >
          タイトル
        </Typography>
        <Paper
          sx={{
            p: theme.spacing(4),
            borderRadius: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(4),
          }}
        >
          <Box>
            <Chip label='tech' />
          </Box>

          {blocks &&
            blocks.map((block, id) => {
              return (
                <Box key={`${id}${block.content}`} component='div'>
                  {convertNotionWithReactComponent(
                    block.type,
                    block.content ?? ''
                  )}
                </Box>
              )
            })}
        </Paper>
      </Container>
    </Box>
  )
}
