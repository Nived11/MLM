import type { PayoutReport } from "../types";

export const dummyData: PayoutReport[] = [
  {
    username: "John Doe",
    amount: 5000,
    status: "Pending",
    payoutamount: 0,
    transactionfee: 0,
    requesteddate: "26-Sep-2021",
    total: 5000
  },
  {
    username: "Jane Smith",
    amount: 7500,
    status: "Completed",
    payoutamount: 0,
    transactionfee: 0,
    requesteddate: "02-Oct-2023",
    total: 7500
  },
  {
   username: "Michael Johnson",
    amount: 10000,
    status: "Pending",
    payoutamount: 0,
    transactionfee: 0,
    requesteddate: "06-Jun-2024",
    total: 10000
  },
  {
    username: "Emily Davis",
    amount: 8000,
    status: "Completed",
    payoutamount: 0,
    transactionfee: 0,
    requesteddate: "10-Aug-2022",    
    total: 8000
  },
  {
    username: "David Wilson",
    amount: 6000,
    status: "Pending",
    payoutamount: 0,    
    transactionfee: 0,
    requesteddate: "15-Oct-2023",
    total: 6000
  }, 
];
