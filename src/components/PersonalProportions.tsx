import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";
import generateVenmoUrl from "../utilities/venmo";
import type Entry from "../models/Entry";
import type Totals from "../models/Totals";

const PersonalProportions = (props: {
  entries: Entry[];
  totals: Totals;
}): React.ReactNode => {
  const { entries, totals } = props;

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
              (entry.amount / totals.subtotal) *
              (totals.subtotal + totals.tax + totals.tip)
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

export default PersonalProportions;
