import { Fragment } from 'react'
import { Box, Typography, Divider, Alert } from '@mui/material'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import Image from 'next/image'
import { Container } from '@mui/system'
import { theme } from '../../../../theme'
import { BookMarkBlock, CodeBlock } from '../parts/ArticleParts'

const convertRichTextWithComponent = (richTexts: RichText[]) => {
  // 文字の装飾がない場合
  if (richTexts.length == 1) {
    return <Fragment>{richTexts[0].plainText}</Fragment>
  }

  return (
    <Fragment>
      {richTexts.map((richText: RichText, id: number) => {
        return <Fragment key={id}>{richText.plainText}</Fragment>
      })}
    </Fragment>
  )
}

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
            {convertRichTextWithComponent(block.heading1.richTexts)}
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
          {convertRichTextWithComponent(block.heading2.richTexts)}
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
          {convertRichTextWithComponent(block.heading3.richTexts)}
        </Typography>
      )
    }

    // 段落
    if (block.paragraph) {
      return (
        <Typography variant='body1' component='p'>
          {convertRichTextWithComponent(block.paragraph.richTexts)}
        </Typography>
      )
    }

    // 箇条書きリスト
    if (block.bulletedListItem) {
      return (
        <ul>
          <li>
            {convertRichTextWithComponent(block.bulletedListItem.richTexts)}
          </li>
          {block.bulletedListItem.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ul>
      )
    }

    // 数字付きリスト
    if (block.numberedListItem) {
      return (
        <ol>
          <li>
            {convertRichTextWithComponent(block.numberedListItem.richTexts)}
          </li>
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
          <li>{convertRichTextWithComponent(block.toDo.richTexts)}</li>
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
            {convertRichTextWithComponent(block.quote.richTexts)}
          </Typography>
        </Box>
      )
    }

    // コールアウト
    if (block.callout) {
      return (
        <Alert severity='info' sx={{ my: theme.spacing(1) }}>
          <Typography component='p' variant='body1'>
            {convertRichTextWithComponent(block.callout.richTexts)}
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
      return <BookMarkBlock bookmark={block.bookmark} />
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
