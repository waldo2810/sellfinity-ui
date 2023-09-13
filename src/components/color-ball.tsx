import React from 'react'

const ColorBall = ({
  colorValue,
  showValue
}: {
  colorValue: string
  showValue: boolean
}) => {
  return (
    <div className="flex items-center gap-x-2">
      {showValue ? colorValue : null}
      <div
        className="h-6 w-6 rounded-full border"
        style={{
          backgroundColor: colorValue
        }}
      />
    </div>
  )
}

export default ColorBall
