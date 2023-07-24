import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, TextField } from "@mui/material";
import type Entry from "../models/Entry";
import CurrencyTextField from "./CurrencyTextField";

const NameField = (props: {
  entry: Entry;
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (id: number) => void;
}): JSX.Element => {
  const { entry, onEditEntry, onDeleteEntry } = props;
  const { name, amount } = entry;

  const onChangeName = (newName: string): void => {
    onEditEntry({ ...entry, name: newName });
  };

  const onChangeAmount = (value: number): void => {
    onEditEntry({ ...entry, amount: Number(value) });
  };

  const isInvalidName = name === "";
  const isInvalidAmount = amount === 0;

  return (
    <Stack direction="row">
      <TextField
        error={isInvalidName}
        helperText={isInvalidName && "Name may not be empty"}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          onChangeName(e.target.value);
        }}
        variant="standard"
        sx={{ margin: 1 }}
        label="Name"
      />
      <CurrencyTextField
        amount={amount}
        onChangeAmount={onChangeAmount}
        TextFieldProps={{
          label: "Amount Owed",
          error: isInvalidAmount,
          helperText: isInvalidAmount && "Amount owed must be greater than 0",
        }}
      />
      <IconButton
        onClick={(e) => {
          onDeleteEntry(entry.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default NameField;
