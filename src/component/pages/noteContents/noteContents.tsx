import React from 'react'
import { Box, Chip, Container, Paper, Typography } from '@mui/material'
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

  const { data } = useQuery({
    queryKey: ['pages'],
    queryFn: () => notionApi.getBlocks({ pageId }),
  })

  const { convertNotionWithReactComponent } =
    useConvertNotionWithReactComponent()

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
        </Paper>
      </Container>
    </Box>
  )
}
