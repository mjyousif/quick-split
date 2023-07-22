import { isMobile } from "react-device-detect";

function generateVenmoUrl(amount: string, note: string = "EDIT ME"): string {
  if (isMobile) {
    return `https://venmo.com/?txn=pay&amount=${amount}&note=${note}`;
  } else {
    return `https://account.venmo.com/pay?amount=${amount}&note=${note}`;
  }
}

export default generateVenmoUrl;
