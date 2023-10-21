import { TextField, TextFieldProps } from '@mui/material';

const Input = (props: TextFieldProps) => (
  <TextField
    className="block w-full py-1 px-2 text-sm font-normal leading-5 text-black border border-solid border-[1px] border-gray-300 rounded-sm transition duration-150 ease-in-out"
    variant="outlined"
    {...props}
  />
);

export default Input;
