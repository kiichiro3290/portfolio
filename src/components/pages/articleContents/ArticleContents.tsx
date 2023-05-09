'use client'

import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Grid,
} from '@mui/material'
import { useConvertNotionWithReactComponent } from './hooks/convertNotionWithReactComponent'
import { TableOfContents } from './parts/TableOfContents'
import { TitleWrapper } from './parts/TitleWrapper'
import { theme } from '../../../theme'

type ArticleContentsPageProps = {
  blocks: Block[]
  page: Page
}

export const ArticleContentsPage: React.FC<ArticleContentsPageProps> = ({
  blocks,
  page,
}) => {
  const { convertNotionWithReactComponent } =
    useConvertNotionWithReactComponent()

  if (!blocks)
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
                  page.tags.map((item: string, id: number) => (
                    <Chip key={id} label={item} color='primary' />
                  ))}
              </Box>
              <Box component='div'>
                {blocks &&
                  blocks.map((block: Block, id: number) => {
                    return (
                      <Box key={`${id}${block}`} component='div'>
                        {convertNotionWithReactComponent(block)}
                      </Box>
                    )
                  })}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3.6} lg={3.6}>
            <TableOfContents data={blocks ?? []} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
