'use client'

import React from 'react'
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Grid,
} from '@mui/material'
import { useConvertNotionWithReactComponent } from './hooks/convertNotionWithReactComponent'
import { useQuery } from '@tanstack/react-query'
import { TableOfContents } from './parts/TableOfContents'
import { TitleWrapper } from './parts/TitleWrapper'
import { theme } from '../../../app/theme'
import { notionApi } from '../../../lib/client/notion'

type NoteContentsPageProps = {
  pageId: string
}

export const NoteContentsPage: React.FC<NoteContentsPageProps> = ({
  pageId,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['pages', pageId],
    queryFn: () => notionApi.getBlocks({ pageId }),
    enabled: !!pageId, // propsのpageIdが渡されてからfetchする
  })

  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
  const page = useQuery({
    queryKey: ['pages'],
    queryFn: () => notionApi.getPages({ databaseId }),
    enabled: !!databaseId && !!pageId,
  }).data?.filter((row: any) => row.id == pageId)[0]

  const { convertNotionWithReactComponent } =
    useConvertNotionWithReactComponent()

  if (isLoading)
    return (
      <Container
        maxWidth='md'
        sx={{
          position: 'absolute',
          top: 'calc(50% - 12px)',
          left: 'calc(50% - 12px)',
        }}
      >
        <CircularProgress />
      </Container>
    )

  return (
    <Box component='div' width='100vw' height='100vh'>
      <Box
        component='div'
        sx={{
          height: { md: theme.spacing(12), sm: theme.spacing(6) },
          backgroundColor: theme.palette.background.paper,
        }}
      ></Box>
      <Container
        maxWidth='lg'
        sx={{
          pt: {
            md: theme.spacing(8),
            xs: theme.spacing(12),
          },
        }}
      >
        {page && <TitleWrapper page={page} />}
        <Grid container gap={4}>
          <Grid item xs={12} md={7.8} lg={8}>
            <Paper
              sx={{
                p: theme.spacing(4),
                borderRadius: theme.spacing(1),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(4),
              }}
            >
              <Box
                component='div'
                sx={{ display: 'flex', gap: theme.spacing(1) }}
              >
                {page &&
                  page.tags &&
                  page.tags.map((row: any, id: number) => (
                    <Chip key={id} label={row} color='primary' />
                  ))}
              </Box>
              <Box component='div'>
                {data &&
                  data.map((block: any, id: number) => {
                    return (
                      <Box key={`${id}${block.content}`} component='div'>
                        {convertNotionWithReactComponent(block)}
                      </Box>
                    )
                  })}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3.6} lg={3.6}>
            <TableOfContents data={data ?? []} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
