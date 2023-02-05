import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionApi } from '~/api/client/notion'

type BlocksObjectSerialized = {
  id: string
  lastEdittedAt: string
  title: string
  emoji: string
  tag: string
}

type NoteContentsPageProps = {
  pageId: string
}

export const NoteContentsPage: React.FC<NoteContentsPageProps> = ({
  pageId,
}) => {
  const theme = useSelector(selectTheme)
  const [blocks, setBlocks] = useState<BlocksObjectSerialized[]>()

  // NotionAPIを叩いた後にParserが必要
  const parseNotionBlocksData = (
    data: Array<PartialBlockObjectResponse | BlockObjectResponse>
  ): BlocksObjectSerialized[] => {
    // 型の付け方が悪いから変なparseが必要
    const res = data.map((row) => {
      return row
    })

    return [
      {
        id: '',
        lastEdittedAt: '',
        title: '',
        emoji: '',
        tag: '',
      },
    ]
  }

  // データベース内のページを取得
  useEffect(() => {
    if (!pageId) return

    const f = async () => {
      const res = await notionApi.getBlocks({ pageId })
      // console.log(res)
      const parsedRes = parseNotionBlocksData(
        res.results as Array<PartialBlockObjectResponse | BlockObjectResponse>
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
      <Container maxWidth='md' sx={{ pt: theme.spacing(8) }}></Container>
    </Box>
  )
}
