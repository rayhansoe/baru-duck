import useNotesStore from '../store/useNotesStore'

const useNotesTool = () => {
  const notes = useNotesStore((state) => state.notes)
  const lastNote = useNotesStore((state) => state.lastNote)
  const activeNote = useNotesStore((state) => state.activeNote)
  const addNote = useNotesStore((state) => state.addNote)
  const addNotes = useNotesStore((state) => state.addNotes)
  const setNotes = useNotesStore((state) => state.setNotes)
  const setLastNote = useNotesStore((state) => state.setLastNote)
  const updateNote = useNotesStore((state) => state.updateNote)
  const setActiveNote = useNotesStore((state) => state.setActiveNote)

  return {
    notes,
    lastNote,
    activeNote,
    addNote,
    addNotes,
    setNotes,
    setLastNote,
    setActiveNote,
    updateNote,
  } as const
}
export default useNotesTool
