import { FC } from 'react'
import { TextFieldInterface } from '@/types/forms/interface';

export const TextAreaField:FC<TextFieldInterface> = ({ value, autoComplete, onChange, id, name, label, required, disabled }) => {
  return (
    <div className="relative w-full">
      <textarea
        className="peer pl-2 h-full min-h-[65px] w-full border-b-2 border-gray-200 bg-transparent pt-4 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-brand focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        id={id}
        name={name} 
        placeholder=" "
        required={required}
        disabled={disabled}
      ></textarea>
      <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-base font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-brand after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 peer-focus:after:border-brand peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        <span className='font-bold'>{label}</span>
      </label>
  </div>
  )
}