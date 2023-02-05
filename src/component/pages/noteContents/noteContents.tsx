import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionApi } from '~/api/client/notion'
import { parseNotionBlocksData } from './utils/parseNotionBlocksData'
import { BlocksObjectSerialized } from './types/notionBlocks'

type NoteContentsPageProps = {
  pageId: string
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
          height: { md: theme.spacing(42), sm: theme.spacing(24) },
          backgroundColor: theme.palette.background.paper,
        }}
      ></Box>
      <Container maxWidth='md' sx={{ pt: theme.spacing(8) }}>
        {blocks &&
          blocks.map((block, id) => {
            return (
              <Box key={`${id}${block.content}`} component='div'>
                {block.content}
              </Box>
            )
          })}
      </Container>
    </Box>
  )
}
