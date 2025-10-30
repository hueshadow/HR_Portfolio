import React, { useCallback } from 'react'
import { useInput } from 'react-admin'
import type { InputProps } from 'ra-core'
import RichTextDescriptionEditor from './RichTextDescriptionEditor'

interface RichTextInputProps extends InputProps<string> {
  label?: string
  helperText?: string
  placeholder?: string
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  source,
  label,
  helperText,
  placeholder
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { isSubmitted },
    isRequired
  } = useInput({ source })

  const handleChange = useCallback((value: string) => {
    field.onChange(value)
  }, [field])

  return (
    <RichTextDescriptionEditor
      value={field.value || ''}
      onChange={handleChange}
      label={label}
      helperText={helperText}
      error={invalid && isSubmitted}
      required={isRequired}
      placeholder={placeholder}
    />
  )
}

export default RichTextInput