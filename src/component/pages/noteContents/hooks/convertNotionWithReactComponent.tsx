import React from 'react'
import { Box, Typography, Divider, Alert, Link } from '@mui/material'
import { BlockType } from '../types/notionBlocks'
import { useSelector } from 'react-redux'
import { selectTheme } from '~/store/theme'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism'
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react'

// シンタックスハイライトのCSSテンプレートがいくつか定義されている→その中で一番かっこいいのがa11yDark
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const CodeBlock: CodeComponent = ({
  children,
  className,
  inline,
}: CodeProps) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)/.exec(className || '')
  const lang = match && match[1] ? match[1] : ''
  console.log(match)
  return (
    <SyntaxHighlighter language={lang} style={a11yDark}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

export const useConvertNotionWithReactComponent = () => {
  const theme = useSelector(selectTheme)

  const convertNotionWithReactComponent = (
    type: BlockType,
    content: string
  ) => {
    switch (type) {
      case 'heading_1': {
        const res = (
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Typography variant='h4' component='h2'>
              {content}
            </Typography>
            <Divider />
          </Box>
        )
        return res
      }
      case 'heading_2': {
        const res = (
          <Typography variant='h5' component='h3'>
            {content}
          </Typography>
        )
        return res
      }
      case 'heading_3': {
        const res = (
          <Typography variant='h6' component='h4'>
            {content}
          </Typography>
        )
        return res
      }
      case 'paragraph': {
        const res = (
          <Typography variant='body1' component='p'>
            {content}
          </Typography>
        )
        return res
      }
      case 'numbered_list_item': {
        const res = (
          <ol>
            <li>{content}</li>
          </ol>
        )
        return res
      }
      case 'bulleted_list_item': {
        const res = (
          <ul>
            <li>{content}</li>
          </ul>
        )
        return res
      }
      case 'to_do': {
        const res = (
          <ul>
            <li>{content}</li>
          </ul>
        )
        return res
      }
      case 'divider': {
        const res = <Divider />
        return res
      }
      case 'quote': {
        const res = (
          <Box
            sx={{
              borderLeft: 'solid',
              pl: '8px',
            }}
          >
            <Typography component='p' variant='body1'>
              {content}
            </Typography>
          </Box>
        )
        return res
      }
      case 'callout': {
        const res = (
          <Alert severity='info'>
            <Typography component='p' variant='body1'>
              {content}
            </Typography>
          </Alert>
        )
        return res
      }
      case 'code': {
        const res = (
          <ReactMarkdown className='' components={{ code: CodeBlock }}>
            {content}
          </ReactMarkdown>
        )
        return res
      }
      case 'bookmark': {
        const res = (
          <Link href={content} underline='none'>
            ブックマーク
          </Link>
        )
        return res
      }
      default: {
        return null
      }
    }
  }

  return { convertNotionWithReactComponent }
}
