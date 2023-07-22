import { Stack, TextField, InputAdornment } from "@mui/material";

const TotalFields = (props: {
  totals: any;
  onSetSubtotal: (value: number) => void;
  onSetTax: (value: number) => void;
  onSetTip: (value: number) => void;
}) => {
  const { totals, onSetSubtotal, onSetTax, onSetTip } = props;

  const onChangeSubtotal = (value: string) => {
    onSetSubtotal(Number(value));
  };
  const onChangeTax = (value: string) => {
    onSetTax(Number(value));
  };
  const onChangeTip = (value: string) => {
    onSetTip(Number(value));
  };

  return (
    <Stack>
      <TextField
        variant="standard"
        placeholder="Subtotal"
        type="number"
        InputProps={{
          readOnly: true,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={totals.subtotal}
        onChange={(e) => onChangeSubtotal(e.target.value)}
      />
      <TextField
        variant="standard"
        placeholder="Tax"
        type="number"
        onChange={(e) => onChangeTax(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        variant="standard"
        placeholder="Tip"
        type="number"
        onChange={(e) => onChangeTip(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        variant="standard"
        placeholder="Total"
        type="number"
        value={totals.subtotal + totals.tip + totals.tax}
        InputProps={{
          readOnly: true,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Stack>
  );
};

export default TotalFields;
