import { useImmerReducer } from "use-immer";
import {
  Button,
  Container,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
class Entry {
  id: number;
  name: string;
  amount: number;

  constructor(id: number, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}

function listReducer(list: Entry[], action: any) {
  switch (action.type) {
    case "added": {
      list.push({
        id: action.id,
        name: "",
        amount: 0.0,
      });
      break;
    }
    case "changed": {
      const index = list.findIndex((t) => t.id === action.entry.id);
      list[index] = action.entry;
      break;
    }
    case "deleted": {
      return list.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const calculateTotalAmount = (entries: Entry[]) =>
  entries.reduce((accumulator, current) => {
    accumulator += current.amount;
    return accumulator;
  }, 0);

let id = 1;
const App = () => {
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);

  const [entries, dispatch] = useImmerReducer(listReducer, initialList);
  function addEntry() {
    dispatch({
      type: "added",
      id: id++,
    });
  }

  function editEntry(entry: Entry) {
    dispatch({
      type: "changed",
      entry: entry,
    });
  }

  function deleteEntry(id: number) {
    dispatch({
      type: "deleted",
      id: id,
    });
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NameList
          entries={entries}
          onAddEntry={addEntry}
          onEditEntry={editEntry}
          onDeleteEntry={deleteEntry}
        />
        <TotalFields
          total={calculateTotalAmount(entries)}
          onSetTotal={setTotal}
          onSetTax={setTax}
          onSetTip={setTip}
        />
        <PersonalProportions entries={entries} totals={{ total, tax, tip }} />
      </Container>
      <div>{JSON.stringify(entries)}</div>
      <div>{total}</div>
    </>
  );
};

const PersonalProportions = (props: { entries: Entry[]; totals: any }) => {
  const { entries, totals } = props;

  const sum = calculateTotalAmount(entries);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Owes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow>
              <TableCell>{entry.name}</TableCell>
              <TableCell align="right">
                {(
                  (entry.amount / sum) *
                  (sum + totals.tax + totals.tip)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TotalFields = (props: {
  total: number;
  onSetTotal: Function;
  onSetTax: Function;
  onSetTip: Function;
}) => {
  const { total, onSetTotal, onSetTax, onSetTip } = props;

  const onChangeTotal = (value: string) => {
    onSetTotal(Number(value));
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
        placeholder="Total"
        type="number"
        InputProps={{
          readOnly: true,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={total}
        onChange={(e) => onChangeTotal(e.target.value)}
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
    </Stack>
  );
};

const NameList = (props: {
  entries: Entry[];
  onAddEntry: Function;
  onEditEntry: Function;
  onDeleteEntry: Function;
}) => {
  const { entries, onAddEntry, onEditEntry, onDeleteEntry } = props;
  const listGroupItems = entries.map((entry) => {
    return (
      <NameField
        entry={entry}
        onEditEntry={onEditEntry}
        onDeleteEntry={onDeleteEntry}
      />
    );
  });

  return (
    <>
      <Stack>
        {listGroupItems}
        <Button
          onClick={() => {
            onAddEntry();
          }}
        >
          Add group member
        </Button>
      </Stack>
    </>
  );
};

const NameField = (props: {
  entry: Entry;
  onEditEntry: Function;
  onDeleteEntry: Function;
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

const initialList: Entry[] = [new Entry(0, "Bloon", 2)];

export default App;
