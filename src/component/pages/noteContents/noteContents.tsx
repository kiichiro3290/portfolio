import React, { useEffect, useState } from 'react'
import { Box, Chip, Container, Paper, Typography } from '@mui/material'
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
        <Typography variant='h5' component='h2'>
          {content}
        </Typography>
      )
      return res
    }
    case 'heading_2':
      break
    case 'heading_3':
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
                  {convertNotionWithReactComponent(block.type, block.content)}
                </Box>
              )
            })}
        </Paper>
      </Container>
    </Box>
  )
}
