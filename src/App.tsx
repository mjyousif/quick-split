import { useImmerReducer } from "use-immer";
import {
  Button,
  Container,
  InputAdornment,
  Link,
  MobileStepper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import generateVenmoUrl from "./venmo";

interface Entry {
  id: number;
  name: string;
  amount: number;
}

enum ActionType {
  Added = "added",
  Changed = "changed",
  Deleted = "deleted",
}

type Action =
  | { type: ActionType.Added; id: number }
  | { type: ActionType.Changed; entry: Entry }
  | { type: ActionType.Deleted; id: number };

function listReducer(list: Entry[], action: Action): Entry[] {
  switch (action.type) {
    case ActionType.Added:
      return [...list, { id: action.id, name: "", amount: 0.0 }];
    case ActionType.Changed:
      return list.map((entry) =>
        entry.id === action.entry.id ? action.entry : entry
      );
    case ActionType.Deleted:
      return list.filter((entry) => entry.id !== action.id);
    default:
      throw new Error("Unknown action");
  }
}

const calculateSubtotalAmount = (entries: Entry[]): number =>
  entries.reduce((accumulator, current) => accumulator + current.amount, 0);

let id = 1;
const App = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [entries, dispatch] = useImmerReducer(listReducer, initialList);
  function addEntry() {
    dispatch({
      type: ActionType.Added,
      id: id++,
    });
  }

  function editEntry(entry: Entry) {
    dispatch({
      type: ActionType.Changed,
      entry: entry,
    });
  }

  function deleteEntry(id: number) {
    dispatch({
      type: ActionType.Deleted,
      id: id,
    });
  }

  useEffect(() => {
    const newSubtotal = calculateSubtotalAmount(entries);
    setSubtotal(newSubtotal);
  }, [entries]);

  const steps = ["Name List", "Total Fields", "Personal Proportions"];
  const maxSteps = steps.length;

  const stepComponents = [
    <NameList
      entries={entries}
      onAddEntry={addEntry}
      onEditEntry={editEntry}
      onDeleteEntry={deleteEntry}
    />,
    <TotalFields
      totals={{ subtotal, tax, tip }}
      onSetSubtotal={setSubtotal}
      onSetTax={setTax}
      onSetTip={setTip}
    />,
    <PersonalProportions entries={entries} totals={{ subtotal, tax, tip }} />,
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <Typography>{steps[activeStep]}</Typography>
          {stepComponents[activeStep]}
        </Stack>
        <MobileStepper
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {<KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {<KeyboardArrowLeft />}
              Back
            </Button>
          }
          steps={maxSteps}
          activeStep={activeStep}
        />
      </Container>
    </>
  );
};

const PersonalProportions = (props: { entries: Entry[]; totals: any }) => {
  const { entries, totals } = props;

  const sum = totals.subtotal;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Owes</TableCell>
            <TableCell>Venmo Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => {
            const amountOwed = (
              (entry.amount / sum) *
              (sum + totals.tax + totals.tip)
            ).toFixed(2);
            return (
              <TableRow key={entry.id}>
                <TableCell>{entry.name}</TableCell>
                <TableCell align="right">${amountOwed}</TableCell>
                <TableCell>
                  <Link href={generateVenmoUrl(amountOwed)}>Venmo</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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

const NameList = (props: {
  entries: Entry[];
  onAddEntry: () => void;
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (id: number) => void;
}) => {
  const { entries, onAddEntry, onEditEntry, onDeleteEntry } = props;

  return (
    <>
      <Stack>
        {entries.map((entry) => (
          <NameField
            key={entry.id}
            entry={entry}
            onEditEntry={onEditEntry}
            onDeleteEntry={onDeleteEntry}
          />
        ))}
        <Button onClick={onAddEntry}>Add group member</Button>
      </Stack>
    </>
  );
};

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

const initialList: Entry[] = [{ id: 0, name: "", amount: 0 }];

export default App;