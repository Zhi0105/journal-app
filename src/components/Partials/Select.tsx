import { FC } from 'react'
import { SelectInterface } from '@/types/forms/interface';
import { categoryItemInterface } from '@/types/category/interface';


export const DropDown: FC<SelectInterface> = ({
  ariaPlaceHolder,
  label,
  value,
  onChange,
  required,
  category_data = [],
}) => {
  return (
    <div className="relative w-full">
      <select
        className="peer pl-2 h-full w-full border-b-2 border-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-brand focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        value={value}
        onChange={onChange}
        autoComplete="autocomplete_off_hack_xfr4!k"
        aria-controls="multiselect-options"
        aria-expanded="false"
        aria-labelledby="assist"
        role="combobox"
        id="underlined_dropdown"
        required={required}
      >
        <option value="" hidden>
          {value ? value : ariaPlaceHolder}
        </option>
        {category_data.length ? (
          category_data.map(
            (category: categoryItemInterface, index: number) => {
              return (
                <option key={index} value={category.id}>
                  {category.title}
                </option>
              );
            }
          )
        ) : (
          <option value="" disabled>
            The list is empty
          </option>
        )}
      </select>
      <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-brand after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-brand peer-focus:after:scale-x-100 peer-focus:after:border-brand peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        <span className="font-bold">{label}</span>
      </label>
    </div>
  );
};