import create from 'zustand'
import _ from 'lodash'
import moment from 'moment'

interface Note {
  _id: string
  note: string
  updatedAt: string
  title?: string
}

interface Notes {
  notes: Note[]
  lastNote: string
  activeNote: string
  setLastNote: (date: string) => void
  setActiveNote: (id: string) => void
  setNotes: (data: Note[]) => void
  addNote: (note: Note) => void
  addNotes: (notes: Note[]) => void
  updateNote: (note: Note) => void
}

const useNotesStore = create<Notes>((set) => ({
  notes: [],
  lastNote: '',
  activeNote: '',
  setLastNote: (date) => set({ lastNote: date }),
  setActiveNote: (id) => set({ activeNote: id }),
  setNotes: (data) =>
    set(() => ({
      notes: data,
    })),
  addNote: (note) =>
    set((state) => {
      const filteredNotes = _.uniqBy(
        [
          {
            ...note,
          },
          ...state.notes,
        ],
        '_id'
      )

      const sortedArray = _.orderBy(
        filteredNotes,
        (a) => moment(a?.updatedAt),
        ['desc']
      )

      return { notes: sortedArray }
    }),
  addNotes: (notes) =>
    set((state) => {
      const mergedNotes = [...state.notes, ...notes]
      const filteredNotes = _.uniqBy(mergedNotes, '_id')

      const sortedArray = _.orderBy(
        filteredNotes,
        (a) => moment(a?.updatedAt),
        'desc'
      )

      return {
        notes: sortedArray,
      }
    }),
  updateNote: (note) =>
    set((state) => {
      const updatedNotes = state.notes.map((item) => {
        if (item._id === note._id) {
          return {
            ...note,
          }
        } else {
          return item
        }
      })

      const sortedArray = _.orderBy(updatedNotes, (a) => moment(a?.updatedAt), [
        'desc',
      ])

      return { notes: sortedArray }
    }),
}))

export default useNotesStore
