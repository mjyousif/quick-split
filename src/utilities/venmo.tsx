import { isMobile } from "react-device-detect";

function generateVenmoUrl(
  amount: string,
  note: string = "Quick-split request"
): string {
  if (isMobile) {
    return `https://venmo.com/?txn=charge&amount=${amount}&note=${note}`;
  } else {
    return `https://account.venmo.com/pay?amount=${amount}&note=${note}`;
  }
}

export default generateVenmoUrl;
