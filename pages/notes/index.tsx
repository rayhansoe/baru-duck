import { useEffect } from 'react'
import useNotesTool from '../../hooks/useNotesTool'

const index = () => {
  const { setActiveNote } = useNotesTool()
  useEffect(() => {
    setActiveNote('')
  }, [])

  return <div>hai</div>
}
export default index
