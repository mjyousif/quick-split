import { Stack } from "@mui/material";
import CurrencyTextField from "./CurrencyTextField";

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
      <CurrencyTextField
        amount={totals.subtotal}
        onChangeAmount={onChangeSubtotal}
        TextFieldProps={{ label: "Subtotal", InputProps: { readOnly: true } }}
      />{" "}
      <CurrencyTextField
        amount={totals.tax}
        onChangeAmount={onChangeTax}
        TextFieldProps={{ label: "Tax" }}
      />{" "}
      <CurrencyTextField
        amount={totals.tip}
        onChangeAmount={onChangeTip}
        TextFieldProps={{ label: "Tip" }}
      />{" "}
      <CurrencyTextField
        amount={totals.subtotal + totals.tip + totals.tax}
        onChangeAmount={() => {}}
        TextFieldProps={{ label: "Total", InputProps: { readOnly: true } }}
      />
    </Stack>
  );
};

export default TotalFields;
