import React, { ReactNode, RefObject, FC, ReactElement, useState } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker, {
  DayValue,
  RenderInputProps,
} from 'react-modern-calendar-datepicker'

interface CustomDatePickerProps {
  renderInput?: (props: RenderInputProps) => ReactElement
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({ renderInput }) => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(null)

  const defaultRenderInput = ({ ref }: RenderInputProps) => (
    <input
      readOnly
      ref={ref as RefObject<HTMLInputElement>}
      placeholder="I'm a custom input"
      value={selectedDay ? `✅: ${selectedDay.day}` : ''}
      style={{
        textAlign: 'center',
        padding: '1rem 1.5rem',
        fontSize: '1.5rem',
        border: '1px solid #9c88ff',
        borderRadius: '100px',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#9c88ff',
        outline: 'none',
      }}
      className="my-custom-input-class"
    />
  )

  const renderInputComponent = renderInput || defaultRenderInput

  return (
    <DatePicker
      value={selectedDay}
      shouldHighlightWeekends
      onChange={setSelectedDay}
      calendarPopperPosition="top"
      renderInput={renderInputComponent}
    />
  )
}

export default CustomDatePicker
