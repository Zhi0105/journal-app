import { categoryItemInterface } from "../category/interface"
export interface TextFieldInterface {
  value?: string | number,
  type?: string,
  autoComplete?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>  | React.ChangeEvent<HTMLSelectElement>) => void,
  id?: string,
  name?: string,
  label?: string,
  required?: boolean,
  disabled?: boolean
}
export interface SelectInterface extends TextFieldInterface {
  ariaPlaceHolder?: string,
  category_data?: categoryItemInterface[] 
}