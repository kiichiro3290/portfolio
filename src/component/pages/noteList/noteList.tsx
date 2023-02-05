import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { ArticleCard } from './parts/ArticleCard'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionApi } from '~/api/client/notion'

type PageObjectSerialized = {
  id: string
  lastEdittedAt: string
  title: string
  emoji: string
  tag: string
}
export const NoteListPage: React.FC = () => {
  const theme = useSelector(selectTheme)
  const [pages, setPages] = useState<PageObjectSerialized[]>()

  // NotionAPIを叩いた後にParserが必要
  const parseNotionPagesData = (
    data: PageObjectResponse[]
  ): PageObjectSerialized[] => {
    // 型の付け方が悪いから変なparseが必要
    const res = data.map((row) => {
      const titleType = row.properties['Name'].type
      const title = (row.properties['Name'] as any)[titleType][0]
        ? ((row.properties['Name'] as any)[titleType][0].plain_text as string)
        : ''
      const iconType = row.icon?.type ?? ''
      const emoji = iconType ? (row.icon as any)[iconType] : ''
      const tagType = row.properties['Tags'].type
      const tag = (row.properties['Tags'] as any)[tagType][0]
        ? ((row.properties['Tags'] as any)[tagType][0].name as string)
        : ''
      return {
        id: row.id,
        lastEdittedAt: row.last_edited_time,
        title: title,
        emoji: emoji,
        tag: tag,
      }
    })

    return res
  }

  // データベース内のページを取得
  useEffect(() => {
    const f = async () => {
      const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
      const res = await notionApi.getPages({ databaseId })
      const parsedRes = parseNotionPagesData(
        res.results as PageObjectResponse[]
      )
      setPages(parsedRes)
    }
    f()
  }, [])

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
        <Grid container rowSpacing={6}>
          {pages &&
            pages.map((page) => {
              return (
                <Grid
                  key={page.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <ArticleCard
                    id={page.id}
                    lastEdittedAt={page.lastEdittedAt}
                    title={page.title}
                    emoji={page.emoji}
                    tag={page.tag}
                  />
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </Box>
  )
}
