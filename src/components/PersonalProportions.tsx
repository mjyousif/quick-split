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
import Entry from "../models/Entry";

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

export default PersonalProportions;
