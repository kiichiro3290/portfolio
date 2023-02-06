import React, { Fragment } from 'react'
import { Box, Typography, Divider, Alert, Link } from '@mui/material'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism'
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react'

// シンタックスハイライトのCSSテンプレートがいくつか定義されている→その中で一番かっこいいのがa11yDark
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { BlockType, BlocksObjectSerialized } from '~/types/notion/block'
import { selectTheme } from '~/store/theme'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Container } from '@mui/system'

type CodeBlockTitleProps = {
  fileName: string
}
const CodeBlockTitle: React.FC<CodeBlockTitleProps> = ({ fileName }) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{
        display: 'inline-block',
        position: 'absolute',
        top: `-${theme.spacing(4)}`,
        left: 0,
        padding: theme.spacing(0.7),
        color: 'white',
        backgroundColor: 'CaptionText',
        borderRadius: `${theme.spacing(0.8)} ${theme.spacing(0.8)} 0 0`,
      }}
    >
      {fileName}
    </Box>
  )
}
const CodeBlock: CodeComponent = ({
  children,
  className,
  inline,
}: CodeProps) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)(:.+)/.exec(className || '')
  const lang = match && match[1] ? match[1] : ''
  const name = match && match[2] ? match[2].slice(1) : ''
  return (
    <Box sx={{ position: 'relative' }}>
      {name && <CodeBlockTitle fileName={name} />}
      <SyntaxHighlighter language={lang} style={a11yDark}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </Box>
  )
}

export const useConvertNotionWithReactComponent = () => {
  const theme = useSelector(selectTheme)
  const convertNotionWithReactComponent = (
    type: BlockType,
    content: string,
    children: BlocksObjectSerialized[]
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
              my: theme.spacing(4),
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
          <Typography
            variant='h5'
            component='h3'
            sx={{ mt: theme.spacing(4), mb: theme.spacing(2) }}
          >
            {content}
          </Typography>
        )
        return res
      }
      case 'heading_3': {
        const res = (
          <Typography
            variant='h6'
            component='h4'
            sx={{ mt: theme.spacing(4), mb: theme.spacing(2) }}
          >
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
            {children &&
              children.map((item, id) => (
                <Fragment key={id}>
                  {convertNotionWithReactComponent(
                    item.type,
                    item.content ?? '',
                    item.children ?? []
                  )}
                </Fragment>
              ))}
          </ol>
        )
        return res
      }
      case 'bulleted_list_item': {
        const res = (
          <ul>
            <li>{content}</li>
            {children &&
              children.map((item, id) => (
                <Fragment key={id}>
                  {convertNotionWithReactComponent(
                    item.type,
                    item.content ?? '',
                    item.children ?? []
                  )}
                </Fragment>
              ))}
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
          <Alert severity='info' sx={{ my: theme.spacing(1) }}>
            <Typography component='p' variant='body1'>
              {content}
            </Typography>
          </Alert>
        )
        return res
      }
      case 'code': {
        const res = (
          <Box sx={{ mb: theme.spacing(4), mt: theme.spacing(6) }}>
            <ReactMarkdown className='' components={{ code: CodeBlock }}>
              {content}
            </ReactMarkdown>
          </Box>
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
      case 'image': {
        const res = (
          <Container maxWidth='md' sx={{ my: theme.spacing(4) }}>
            <Image src={content} alt={type} width={800} height={600} />
          </Container>
        )
        return res
      }
    }
  }

  return { convertNotionWithReactComponent }
}
