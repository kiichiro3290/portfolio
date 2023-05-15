'use client'

import { Box } from '@mui/material'
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
// シンタックスハイライトのCSSテンプレートがいくつか定義されている→その中で一番かっこいいのがa11yDark
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
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

export const CodeBlock: CodeComponent = ({
  children,
  className,
  inline,
}: CodeProps) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = String(className).split(':')
  const lang = match && match[1] ? match[1] : ''
  const caption = match && match[2] ? match[2] : ''

  return (
    <Box component='div' sx={{ position: 'relative' }}>
      {caption && <CodeBlockTitle fileName={caption} />}
      <SyntaxHighlighter language={lang} style={a11yDark}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </Box>
  )
}
