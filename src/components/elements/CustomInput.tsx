import {
  TextField,
  StandardTextFieldProps,
  InputAdornment,
  IconButton,
  InputBaseComponentProps,
} from '@mui/material';

export type CustomInputProps = {
  onEndClickIcon?: () => void;
  suffixIcon?: JSX.Element;
  prefixIcon?: JSX.Element;
  inputProps?: InputBaseComponentProps;
} & Omit<StandardTextFieldProps, 'id'>;

const CustomInput = (props: CustomInputProps) => {
  const {
    fullWidth,
    name,
    inputProps,
    suffixIcon,
    prefixIcon,
    onEndClickIcon,
    ...textFieldProps
  } = props;

  return (
    <TextField
      name={name}
      id={name}
      InputProps={{
        inputProps,
        startAdornment: prefixIcon && (
          <InputAdornment position='start'>
            <IconButton>{prefixIcon}</IconButton>
          </InputAdornment>
        ),
        endAdornment: suffixIcon && (
          <InputAdornment position='end'>
            <IconButton onClick={onEndClickIcon}>{suffixIcon}</IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth={fullWidth ?? true}
      variant='outlined'
      {...textFieldProps}
    />
  );
};

export default CustomInput;
