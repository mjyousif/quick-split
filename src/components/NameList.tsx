import { Stack, Button } from "@mui/material";
import type Entry from "../models/Entry";
import NameField from "./NameField";

const NameList = (props: {
  entries: Entry[];
  onAddEntry: () => void;
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (id: number) => void;
}): React.ReactNode => {
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

export default NameList;
