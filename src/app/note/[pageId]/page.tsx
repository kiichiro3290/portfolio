import React from 'react'

import { useRouter } from 'next/router'
import { NoteContentsPage } from 'src/app/component/pages/noteContents/NoteContents'
import { NoteHead } from '../head'

const NoteContents: React.FC = () => {
  const router = useRouter()
  const { pageId } = router.query

  return (
    <>
      <NoteHead />
      <NoteContentsPage pageId={pageId as string} />
    </>
  )
}

export default NoteContents
