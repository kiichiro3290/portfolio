import React from 'react'
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { notionApi } from '~/api/client/notion'
import { useConvertNotionWithReactComponent } from './hooks/convertNotionWithReactComponent'
import { useQuery } from '@tanstack/react-query'

type NoteContentsPageProps = {
  pageId: string
}

export const NoteContentsPage: React.FC<NoteContentsPageProps> = ({
  pageId,
}) => {
  const theme = useSelector(selectTheme)

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
  }).data?.filter((row) => row.id == pageId)[0]

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
      <Container maxWidth='md' sx={{ pt: theme.spacing(8) }}>
        <Typography
          variant='h4'
          component='h1'
          sx={{ textAlign: 'center', mb: theme.spacing(2) }}
        >
          {page?.emoji ? page?.emoji : '😃'}
        </Typography>
        <Typography
          variant='h4'
          component='h1'
          sx={{ textAlign: 'center', mb: theme.spacing(8) }}
        >
          {page?.title ? page?.title : '無タイトル'}
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
          <Box component='div' sx={{ display: 'flex', gap: theme.spacing(1) }}>
            {page &&
              page.tags &&
              page.tags.map((row, id) => (
                <Chip key={id} label={row} color='primary' />
              ))}
          </Box>
          <Box component='div'>
            {data &&
              data.map((block, id) => {
                return (
                  <Box key={`${id}${block.content}`} component='div'>
                    {convertNotionWithReactComponent(
                      block.type,
                      block.content ?? '',
                      block.children ?? []
                    )}
                  </Box>
                )
              })}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
