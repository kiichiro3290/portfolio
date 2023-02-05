import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionApi } from '~/api/client/notion'

const textBlockList = [
  'heading_1',
  'heading_2',
  'heading_3',
  'toggle',
  'callout',
  'quote',
  'paragraph',
]
const listItemBlockList = ['bulleted_list_item', 'to_do', 'numbered_list_item']
type TextBlock = typeof textBlockList[number]
type DecorationBlock = 'divider'
type ListItemBlock = typeof listItemBlockList[number]
type BlockType = TextBlock | DecorationBlock | ListItemBlock
type BlocksObjectSerialized = {
  type: BlockType
  content?: string
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
    data: Array<BlockObjectResponse>
  ): BlocksObjectSerialized[] => {
    // 型の付け方が悪いから変なparseが必要
    const res = data.map((row) => {
      const type = row.type
      const decorationBlockList = ['divider']
      const tableBlock = 'table'
      const codeBlock = 'code'
      const bookmarkBlock = 'bookmark'
      if (textBlockList.includes(type)) {
        const content = (row as any)[type].rich_text[0]
          ? (row as any)[type].rich_text[0].plain_text
          : ''

        return {
          type,
          content,
        }
      }

      if (decorationBlockList.includes(type)) {
        return {
          type,
        }
      }

      if (listItemBlockList.includes(type)) {
        const content = (row as any)[type].rich_text[0].plain_text

        return {
          type,
          content,
        }
      }

      if (codeBlock == type) {
        // コードはキャプションとかプログラミング言語の情報を持っている
        const language = row[type].language
        const caption = row[type].caption[0] ?? ''
        const content = (row[type].rich_text[0] as any).palin_text

        return {
          type,
          content,
        }
      }

      if (tableBlock == type) {
        // テーブルはchildrenを持っているのでめちゃくちゃだるい→正直対応したくない
        const content = ''
        return {
          type,
          content,
        }
      }

      if (bookmarkBlock == type) {
        const content = row[type].url

        return {
          type,
          content,
        }
      }

      return {
        type,
      }
    })

    return res
  }

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
