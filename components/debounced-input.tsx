import React, { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string | number) => void
  debounce?: number
}

function DebouncedInput(props: Props) {
  const { value: initialValue, onChange, debounce = 500 } = props
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      placeholder="Search your artist here..."
    />
  )
}

export default DebouncedInput
