import { Stack, TextField, IconButton } from "@mui/material";
import Entry from "../models/Entry";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyTextField from "./CurrencyTextField";

const NameField = (props: {
  entry: Entry;
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (id: number) => void;
}) => {
  const { entry, onEditEntry, onDeleteEntry } = props;
  const { name, amount } = entry;

  const onChangeName = (newName: string) => {
    onEditEntry({ ...entry, name: newName });
  };

  const onChangeAmount = (value: string) => {
    onEditEntry({ ...entry, amount: Number(value) });
  };

  const isInvalid = !name;

  return (
    <Stack direction="row">
      <TextField
        error={isInvalid}
        helperText={isInvalid && "Name may not be empty"}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        variant="standard"
        sx={{ margin: 1 }}
        label="Name"
      />
      <CurrencyTextField
        amount={amount}
        onChangeAmount={onChangeAmount}
        TextFieldProps={{ label: "Amount Owed" }}
      />
      <IconButton onClick={(e) => onDeleteEntry(entry.id)}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default NameField;
