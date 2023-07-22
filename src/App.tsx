import { useImmerReducer } from "use-immer";
import {
  AppBar,
  Box,
  Button,
  Container,
  MobileStepper,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PersonalProportions from "./components/PersonalProportions";
import TotalFields from "./components/TotalFields";
import NameField from "./components/NameField";
import Entry from "./models/Entry";

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

  const isNextActive =
    activeStep !== maxSteps - 1 &&
    entries.length > 0 &&
    !entries.some((entry) => entry.name.trim() === "");

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 768,
        margin: "0 auto", // This centers the box horizontally
        minHeight: "100vh", // This ensures the box takes the full height of the viewport
        p: 2, // Add some padding to the box
      }}
    >
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Quick-Split
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <Typography align="center" variant="h6">
            {steps[activeStep]}
          </Typography>
          {stepComponents[activeStep]}
        </Stack>
      </Container>{" "}
      <MobileStepper
        nextButton={
          <Button size="small" onClick={handleNext} disabled={!isNextActive}>
            Next
            {<KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {<KeyboardArrowLeft />}
            Back
          </Button>
        }
        steps={maxSteps}
        activeStep={activeStep}
      />
    </Box>
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

const initialList: Entry[] = [{ id: 0, name: "", amount: 0 }];

export default App;
