import { axiosPublic } from '../api/axios'
import useNotesTool from './useNotesTool'

interface Note {
  note: string
}

const useNotesAPI = () => {
  const { lastNote, activeNote } = useNotesTool()

  const getNotes = async () => {
    const res = await axiosPublic.get(
      `/api/notes${lastNote ? `?_lastNote=${lastNote}` : ''}`
    )
    return res
  }

  const updateNote = async (note: Object) => {
    const res = await axiosPublic.put(`/api/notes/${activeNote}`, note)
    return res
  }

  const createNote = async () => {
    const res = await axiosPublic.post('/api/notes')
    return res
  }

  return { getNotes, updateNote, createNote } as const
}
export default useNotesAPI
