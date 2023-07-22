import { isMobile } from "react-device-detect";

function generateVenmoUrl(amount: string, note: string = ""): string {
  if (isMobile) {
    return `https://venmo.com/?txn=charge&note=${note}&amount=${amount}`;
  } else {
    return `https://account.venmo.com/pay?amount=${amount}&note=note=${note}`;
  }
}

export default generateVenmoUrl;
