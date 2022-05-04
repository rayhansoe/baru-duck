import Link from 'next/link'
import useNotes from '../../hooks/useNotes'
import useNotesTool from '../../hooks/useNotesTool'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import useNotesAPI from '../../hooks/useNotesAPI'
import { useRouter } from 'next/router'

export const NotesComponent = () => {
  const { data, error, refetch, isFetching, isLoading, isError } = useNotes()
  const { notes, activeNote, addNote, setActiveNote } = useNotesTool()
  const { ref, inView } = useInView()
  const router = useRouter()
  const notesAPI = useNotesAPI()

  const { mutate } = useMutation(notesAPI.createNote, {
    onSuccess: (data) => {
      const newNote = data?.data?.newNote

      addNote(newNote)

      setActiveNote(newNote?._id)

      router.push(`/notes/${newNote?._id}`)
    },
  })

  const createNote = () => {
    mutate()
  }

  useEffect(() => {
    if (inView && data?.data.length !== 0) {
      refetch()
    }
  }, [inView])

  return (
    <div>
      <div className="flex flex-row">
        <h1 className="mr-4">
          <Link href={'/notes'}>
            <a>NOTES</a>
          </Link>
        </h1>
        <button onClick={createNote}>➕</button>
      </div>
      <div className="h-48 overflow-y-scroll">
        {isLoading ? (
          <span>Laoding...</span>
        ) : isError && error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <div>
            {notes?.map((note) => (
              <div
                key={note._id}
                className={`flex cursor-pointer px-1 py-1 ${
                  activeNote === note._id ? 'bg-slate-200' : ''
                } hover:bg-slate-200`}
              >
                <Link href={`/notes/${note._id}`}>
                  <a className="w-full">{note.note}</a>
                </Link>
              </div>
            ))}
          </div>
        )}
        <button
          ref={ref}
          onClick={() => refetch()}
          disabled={data?.data.length < 10}
        >
          {isFetching
            ? 'Loading more...'
            : !(data?.data.length < 10)
            ? 'Load another notes'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  )
}
