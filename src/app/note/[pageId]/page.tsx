import { useParams } from 'next/navigation'
import { NoteHead } from '../head'
import { NoteContentsPage } from '../../../components/pages/noteContents/NoteContents'

const NoteContents: React.FC = () => {
  const params = useParams()

  return (
    <>
      <NoteHead />
      <NoteContentsPage pageId={params?.pageId as string} />
    </>
  )
}

export default NoteContents
