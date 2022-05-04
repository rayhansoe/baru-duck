import { useEffect } from 'react'
import { useQuery } from 'react-query'
import useNotesAPI from './useNotesAPI'
import useNotesTool from './useNotesTool'

const useNotes = () => {
  const { notes, lastNote, addNotes, setLastNote } = useNotesTool()
  const { getNotes } = useNotesAPI()

  const { data, status, error, refetch, isFetching, isLoading, isError } =
    useQuery('notes', getNotes, {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        const notes = data?.data
        const lastNotee: string = notes[notes.length - 1]?.updatedAt

        setLastNote(lastNotee)
        addNotes(notes)
      },
    })

  useEffect(() => {
    refetch()
  }, [])

  return {
    data,
    status,
    error,
    refetch,
    isFetching,
    isLoading,
    isError,
  } as const
}
export default useNotes
