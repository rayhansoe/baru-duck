import { useNProgress } from '@tanem/react-nprogress'
import { useRouter } from 'next/router'

import { Bar } from './Bar'
import { BarContainer } from './BarContainer'

interface Props {
  isAnimating: boolean
}

export const Progress = ({ isAnimating }: Props) => {
  const router = useRouter()

  if (!router.isReady) {
    return <div>Loading</div> // Or any loading component
  }
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })
  return (
    <BarContainer animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </BarContainer>
  )
}
