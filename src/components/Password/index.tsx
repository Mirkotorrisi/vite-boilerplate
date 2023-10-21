import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';

const Password = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <TextField
      id="password"
      label={t('login.password')}
      variant="outlined"
      autoComplete="current-password"
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              onMouseDown={handleShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      placeholder={t('login.enter-password')}
      className="block w-full py-1 px-2 text-sm font-normal leading-5 text-black border border-solid border-[1px] border-gray-300 rounded-sm transition duration-150 ease-in-out"
      {...props}
    />
  );
};

export default Password;
