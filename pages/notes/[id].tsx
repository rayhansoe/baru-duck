import { axiosPublic } from '../../api/axios'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useNotesAPI from '../../hooks/useNotesAPI'
import useNotesTool from '../../hooks/useNotesTool'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMutation } from 'react-query'

const Index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { updateNote, notes, addNote, setActiveNote, activeNote } =
    useNotesTool()
  const notesAPI = useNotesAPI()
  const note = notes.find((note) => data._id === note._id)
  const [refNote, setRefNote] = useState(data?.note)
  const [isTyping, setIsTyping] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  let typingTimer: NodeJS.Timeout //timer identifier
  let doneTypingInterval = 3000

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    notesAPI.updateNote,
    {
      onSuccess: (data) => {
        const updatedNote = data?.data?.updatedNote

        updateNote({ ...updatedNote })

        setRefNote(() => updatedNote.note)

        setIsSaved(true)
      },
    }
  )

  //user is "finished typing," do something
  function doneTyping() {
    setIsEdited(() => true)
    setIsTyping(() => false)
  }

  const handleKeyUp = () => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(doneTyping, doneTypingInterval)
  }

  const handleKeyDown = () => {
    clearTimeout(typingTimer)
    setIsEdited(() => false)
    setIsSaved(() => false)
    setIsTyping(() => true)
  }

  const handleChange = (e: { target: { value: string } }) => {
    setRefNote(e.target.value)
  }

  if (!note && data?.note) {
    addNote({ ...data })
  }

  useEffect(() => {
    if (note) {
      updateNote({ ...data })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.note])

  useEffect(() => {
    if (data?.note) {
      setRefNote(data.note)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNote])

  useEffect(() => {
    if (data?._id && note?._id) {
      setActiveNote(note?._id)
    }
  }, [data?._id, note?._id])

  useEffect(() => {
    if (data?.note) {
      setRefNote(data.note)
    }
  }, [data?.note])

  useEffect(() => {
    if (isEdited) mutate({ note: refNote })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdited])
  return (
    <>
      <div>Note</div>
      <div>
        <p>
          {(isEdited || !isEdited) && !isTyping ? 'Edited' : 'Typing'}{' '}
          {!isSaved && isLoading && !isSuccess ? 'Saving' : 'Saved'}
        </p>
        <textarea
          value={refNote}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />

        <p>{refNote}</p>
        <p>{note?.note ? note?.note : data?.note}</p>
      </div>
    </>
  )
}
export default Index

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // ...
  const id = ctx?.params?.id

  const res = await axiosPublic.get(`/api/notes/${id}`)

  const data = res.data
  return {
    props: { data }, // will be passed to the page component as props
  }
}
