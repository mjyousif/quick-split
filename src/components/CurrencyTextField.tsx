import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";

interface CurrencyTextFieldProps {
  amount: number;
  onChangeAmount: Function;
  TextFieldProps?: TextFieldProps;
}

const CurrencyTextField = (props: CurrencyTextFieldProps) => {
  const { amount, onChangeAmount, TextFieldProps } = props;
  const [displayedValue, setDisplayedValue] = useState(amount.toFixed(2));
  useEffect(() => {
    setDisplayedValue(amount.toFixed(2));
  }, [amount]);

  const onChangeValue = (value: string) => {
    const pattern = new RegExp(/^\d*(\.\d{0,2})?$/);
    if (pattern.test(value)) {
      setDisplayedValue(value);
    }
  };

  const onBlurValue = (value: string) => {
    if (value === "" || value === ".") {
      value = "0";
    }
    const formattedValue = parseFloat(value).toFixed(2);
    setDisplayedValue(formattedValue);
    onChangeAmount(formattedValue);
  };

  return (
    <TextField
      {...TextFieldProps}
      value={displayedValue}
      onChange={(e) => onChangeValue(e.target.value)}
      onBlur={(e) => onBlurValue(e.target.value)}
      variant="standard"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
        ...TextFieldProps?.InputProps,
      }}
      inputProps={{ inputMode: "numeric" }}
      sx={{ margin: 1 }}
    />
  );
};

export default CurrencyTextField;
