import { Stack } from "@mui/material";
import CurrencyTextField from "./CurrencyTextField";
import type Totals from "../models/Totals";

const TotalFields = (props: {
  totals: Totals;
  onSetSubtotal: (value: number) => void;
  onSetTax: (value: number) => void;
  onSetTip: (value: number) => void;
}): React.ReactNode => {
  const { totals, onSetSubtotal, onSetTax, onSetTip } = props;

  const onChangeSubtotal = (value: number): void => {
    onSetSubtotal(Number(value));
  };
  const onChangeTax = (value: number): void => {
    onSetTax(Number(value));
  };
  const onChangeTip = (value: number): void => {
    onSetTip(Number(value));
  };

  return (
    <Stack>
      <CurrencyTextField
        amount={totals.subtotal}
        onChangeAmount={onChangeSubtotal}
        TextFieldProps={{ label: "Subtotal", InputProps: { readOnly: true } }}
      />
      <CurrencyTextField
        amount={totals.tax}
        onChangeAmount={onChangeTax}
        TextFieldProps={{ label: "Tax" }}
      />
      <CurrencyTextField
        amount={totals.tip}
        onChangeAmount={onChangeTip}
        TextFieldProps={{ label: "Tip" }}
      />
      <CurrencyTextField
        amount={totals.subtotal + totals.tip + totals.tax}
        onChangeAmount={() => {}}
        TextFieldProps={{ label: "Total", InputProps: { readOnly: true } }}
      />
    </Stack>
  );
};

export default TotalFields;
