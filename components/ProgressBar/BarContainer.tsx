interface Props {
  animationDuration: number
  isFinished: boolean
  children: JSX.Element
}

export const BarContainer = ({
  animationDuration,
  children,
  isFinished,
}: Props) => {
  return (
    <div
      className="pointer-events-none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >{children}</div>
  )
}
