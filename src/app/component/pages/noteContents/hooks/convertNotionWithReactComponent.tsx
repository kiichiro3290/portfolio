import React, { Fragment } from 'react'
import { Box, Typography, Divider, Alert, Link, Card } from '@mui/material'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism'
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react'

// シンタックスハイライトのCSSテンプレートがいくつか定義されている→その中で一番かっこいいのがa11yDark
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { BlocksObjectSerialized } from 'src/types/notion/block'
import Image from 'next/image'
import { Container } from '@mui/system'
import { theme } from '~/theme'

type CodeBlockTitleProps = {
  fileName: string
}
const CodeBlockTitle: React.FC<CodeBlockTitleProps> = ({ fileName }) => {
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
  const convertNotionWithReactComponent = (block: BlocksObjectSerialized) => {
    console.log(block)
    switch (block.type) {
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
              {block.content}
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
            {block.content}
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
            {block.content}
          </Typography>
        )
        return res
      }
      case 'paragraph': {
        const res = (
          <Typography variant='body1' component='p'>
            {block.content}
          </Typography>
        )
        return res
      }
      case 'numbered_list_item': {
        const res = (
          <ol>
            <li>{block.content}</li>
            {block.children &&
              block.children.map((item, id) => (
                <Fragment key={id}>
                  {convertNotionWithReactComponent(item)}
                </Fragment>
              ))}
          </ol>
        )
        return res
      }
      case 'bulleted_list_item': {
        const res = (
          <ul>
            <li>{block.content}</li>
            {block.children &&
              block.children.map((item, id) => (
                <Fragment key={id}>
                  {convertNotionWithReactComponent(item)}
                </Fragment>
              ))}
          </ul>
        )
        return res
      }
      case 'to_do': {
        const res = (
          <ul>
            <li>{block.content}</li>
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
              {block.content}
            </Typography>
          </Box>
        )
        return res
      }
      case 'callout': {
        const res = (
          <Alert severity='info' sx={{ my: theme.spacing(1) }}>
            <Typography component='p' variant='body1'>
              {block.content}
            </Typography>
          </Alert>
        )
        return res
      }
      case 'code': {
        const res = (
          <Box sx={{ mb: theme.spacing(4), mt: theme.spacing(6) }}>
            <ReactMarkdown className='' components={{ code: CodeBlock }}>
              {block.content ?? ''}
            </ReactMarkdown>
          </Box>
        )
        return res
      }
      case 'bookmark': {
        const ogp = block.ogp
        const res = (
          <Link
            component='a'
            href={ogp?.pageUrl}
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
                {ogp?.title}
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
                {ogp?.pageUrl}
              </Typography>
            </Card>
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
            <Image
              src={block.content ?? ''}
              alt={block.type}
              width={800}
              height={600}
            />
          </Container>
        )
        return res
      }
    }
  }

  return { convertNotionWithReactComponent }
}
