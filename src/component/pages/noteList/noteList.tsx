import React, { Fragment, SyntheticEvent, useState } from 'react'
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { ArticleCard } from './parts/ArticleCard'
import { notionApi } from '~/api/client/notion'
import { useQuery } from '@tanstack/react-query'

export type PageObjectSerialized = {
  id: string
  lastEdittedAt: string
  title: string
  emoji: string
  tags: string[]
}
export const NoteListPage: React.FC = () => {
  const theme = useSelector(selectTheme)
  const [value, setValue] = useState(0)
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''
  const { data } = useQuery({
    queryKey: ['pages'],
    queryFn: () => notionApi.getPages({ databaseId }),
  })

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box component='div' width='100vw' height='100vh'>
      <Box
        component='div'
        sx={{
          height: { md: theme.spacing(42), sm: theme.spacing(24) },
          backgroundColor: theme.palette.background.paper,
          position: 'relative',
        }}
      >
        <Container maxWidth='md' sx={{ pt: theme.spacing(20) }}>
          <Typography variant='h3' component='h1'>
            ドキュメント
          </Typography>
        </Container>
      </Box>
      <Container
        maxWidth='md'
        sx={{ pt: theme.spacing(8), position: 'relative' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            mb: theme.spacing(2),
            position: 'absolute',
            top: `-${theme.spacing(6)}`, // タブを色の境界部分に表示させる(もっといい記法があるかも)
          }}
        >
          <Tab label='Memo' />
          <Tab label='Work' />
        </Tabs>
        <TabPanel index={0} value={value}>
          <Grid container rowSpacing={6}>
            {data &&
              data.map((page) => {
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
                      tag={page.tags[0]}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Fragment>{children}</Fragment>}
    </Box>
  )
}
