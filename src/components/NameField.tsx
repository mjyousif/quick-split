import { Stack, TextField, InputAdornment } from "@mui/material";
import Entry from "../models/Entry";

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

  return (
    <Stack direction="row">
      <TextField
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        variant="standard"
      />
      <TextField
        value={amount}
        type="number"
        onChange={(e) => onChangeAmount(e.target.value)}
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Stack>
  );
};

export default NameField;
