import { InputHTMLAttributes, useEffect, useState } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setValue?: React.Dispatch<React.SetStateAction<number>>
  value: number
  maxValue?: number
  action?: any
  actionValue?: any
}

export default function QuantityController({ maxValue, setValue, value, action, actionValue }: Props) {
  const [inputValue, setInputValue] = useState(value)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (action) action(actionValue, inputValue)
  }, [inputValue])

  const handleIncrease = () => {
    if (maxValue && value >= maxValue && inputValue >= maxValue) {
      setError(true)
    } else {
      if (setValue) setValue(value + 1)
      setInputValue(inputValue + 1)
    }
  }
  const handleDecrease = () => {
    if (inputValue > 1) {
      if (setValue) setValue(value - 1)
      setInputValue(inputValue - 1)
    }
  }
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^\d+$/) && event.target.value !== '') {
      if (setValue) setValue(Number(event.target.value))
      setInputValue(Number(event.target.value))
    }
  }

  const handleCheckValue = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (maxValue && Number(event.target.value) > maxValue) {
      if (setValue) setValue(maxValue)
      setInputValue(maxValue)
      setError(true)
    }
  }
  return (
    <div className='relative translate-y-[20%]'>
      <div className='flex'>
        <button className='border p-2' onClick={handleDecrease}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4 '>
            <path
              fillRule='evenodd'
              d='M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <input
          type='text'
          value={inputValue}
          onBlur={handleCheckValue}
          className='outline-none w-12 text-center border-y'
          onChange={handleChangeValue}
        />

        <button className='border p-2' onClick={handleIncrease}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4'>
            <path
              fillRule='evenodd'
              d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <p className={`text-xs text-red-500 text-center ${error ? 'block' : 'invisible'}`}>
        Số lượng tối đa là {maxValue}
      </p>
    </div>
  )
}
