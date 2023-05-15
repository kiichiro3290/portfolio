import { Fragment } from 'react'
import { Box, Typography, Divider, Alert, Link, Card } from '@mui/material'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import Image from 'next/image'
import { Container } from '@mui/system'
import { theme } from '../../../../theme'
import { CodeBlock } from '../parts/CodeBlock'

export const useConvertNotionWithReactComponent = () => {
  const convertNotionWithReactComponent = (block: Block) => {
    // 見出し1
    if (block.heading1) {
      return (
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            my: theme.spacing(4),
          }}
        >
          <Typography variant='h4' component='h2'>
            {block.heading1.richTexts[0].plainText}
          </Typography>
          <Divider />
        </Box>
      )
    }

    // 見出し2
    if (block.heading2) {
      return (
        <Typography
          variant='h5'
          component='h3'
          sx={{ mt: theme.spacing(4), mb: theme.spacing(2) }}
        >
          {block.heading2.richTexts[0].plainText}
        </Typography>
      )
    }

    // 見出し3
    if (block.heading3) {
      return (
        <Typography
          variant='h6'
          component='h4'
          sx={{ mt: theme.spacing(4), mb: theme.spacing(2) }}
        >
          {block.heading3.richTexts[0].plainText}
        </Typography>
      )
    }

    // 段落
    if (block.paragraph) {
      return (
        <Typography variant='body1' component='p'>
          {block.paragraph.richTexts[0].plainText}
        </Typography>
      )
    }

    // 箇条書きリスト
    if (block.bulletedListItem) {
      return (
        <ol>
          <li>{block.bulletedListItem.richTexts[0].plainText}</li>
          {block.bulletedListItem.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ol>
      )
    }

    // 数字付きリスト
    if (block.numberedListItem) {
      return (
        <ol>
          <li>{block.numberedListItem.richTexts[0].plainText}</li>
          {block.numberedListItem.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ol>
      )
    }

    // TODOリスト
    if (block.toDo) {
      return (
        <ol>
          <li>{block.toDo.richTexts[0].plainText}</li>
          {block.toDo.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ol>
      )
    }

    // 引用
    if (block.quote) {
      return (
        <Box
          sx={{
            borderLeft: 'solid',
            pl: '8px',
          }}
        >
          <Typography component='p' variant='body1'>
            {block.quote.richTexts[0].plainText}
          </Typography>
        </Box>
      )
    }

    // コールアウト
    if (block.callout) {
      return (
        <Alert severity='info' sx={{ my: theme.spacing(1) }}>
          <Typography component='p' variant='body1'>
            {block.callout.richTexts[0].plainText}
          </Typography>
        </Alert>
      )
    }

    // コードブロック
    if (block.code) {
      const divider = '```'

      const codeText = `${divider}:${block.code.language}:${
        block.code.caption.length !== 0 ? block.code.caption[0].plainText : ''
      } \n ${block.code.richTexts[0].plainText} \n${divider}`

      return (
        <Box sx={{ mb: theme.spacing(4), mt: theme.spacing(6) }}>
          <ReactMarkdown components={{ code: CodeBlock }}>
            {codeText ?? ''}
          </ReactMarkdown>
        </Box>
      )
    }

    // ブックマーク
    if (block.bookmark) {
      return (
        <Link
          component='a'
          href={block.bookmark.url}
          underline='none'
          target='_blank'
        >
          <Card
            component='div'
            sx={{
              height: theme.spacing(12),
              my: theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
              borderLeft: 'solid',
              borderRight: 'solid',
              borderLeftColor: theme.palette.primary.main,
              borderRightColor: theme.palette.primary.main,
              borderLeftWidth: theme.spacing(0.8),
              borderRightWidth: theme.spacing(0.8),
              p: theme.spacing(1.5),
            }}
          >
            <Typography
              sx={{
                height: theme.spacing(5),
                lineHeight: theme.spacing(5),
                textOverflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {'todo: ogp'}
            </Typography>

            <Typography
              variant='caption'
              sx={{
                textOverflow: 'hidden',
                height: theme.spacing(2),
                lineHeight: theme.spacing(2),
                whiteSpace: 'nowrap',
              }}
            >
              {'todo: ogp'}
            </Typography>
          </Card>
        </Link>
      )
    }

    // 画像
    if (block.image) {
      return (
        <Container maxWidth='md' sx={{ my: theme.spacing(4) }}>
          <Image
            src={block.image.file?.url ?? ''}
            alt={block.type}
            width={600}
            height={400}
          />
        </Container>
      )
    }
  }

  return { convertNotionWithReactComponent }
}
