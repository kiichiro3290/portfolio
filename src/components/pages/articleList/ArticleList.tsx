'use client'

import { Fragment, SyntheticEvent, useState } from 'react'
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import { ArticleCard } from './parts/ArticleCard'
import { theme } from '../../../theme'

type ArticleListProps = {
  pages: Page[]
}

export const ArticleList: React.FC<ArticleListProps> = ({ pages }) => {
  const [value, setValue] = useState(0)

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
        <Container
          maxWidth='md'
          sx={{ pt: theme.spacing(20), pb: { xs: theme.spacing(8) }, md: 0 }}
        >
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
                      lastEditedAt={page.lastEditedAt}
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
