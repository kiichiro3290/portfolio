import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { ArticleCard } from './parts/ArticleCard'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionApi } from '~/api/client/notion'
import { useQuery } from '@tanstack/react-query'
import { parseNotionPagesData } from './utils/parseNotionPagesData'

export type PageObjectSerialized = {
  id: string
  lastEdittedAt: string
  title: string
  emoji: string
  tag: string
}
export const NoteListPage: React.FC = () => {
  const theme = useSelector(selectTheme)
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
  const { data } = useQuery({
    queryKey: ['pages'],
    queryFn: () => notionApi.getPages({ databaseId }),
  })

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
          {data &&
            parseNotionPagesData(data.results as PageObjectResponse[]).map(
              (page) => {
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
              }
            )}
        </Grid>
      </Container>
    </Box>
  )
}
