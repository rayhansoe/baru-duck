import { useRouter } from 'next/router'

interface Props {
  animationDuration: number
  progress: number
}

export const Bar = ({ animationDuration, progress }: Props) => {
  const { isReady } = useRouter()

  if (!isReady) {
    return null
  }

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full bg-indigo-600"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    ></div>
  )
}
