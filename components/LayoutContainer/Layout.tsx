import { NotesComponent } from '../Notes'

interface Props {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <NotesComponent />
      {children}
    </div>
  )
}
