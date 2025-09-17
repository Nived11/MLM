import type { SendRequest } from "../type";

export const dummyData: SendRequest[] = [
  {
    fromname: "John Doe",
    username: "KL20393",
    amount: 5000,
    status: "Pending",
    proof: "https://example.com/proof.jpg",
    level: "LEVEL 1",
    requesteddate: "26-Sep-2021",
  },
  {
    fromname: "Jane Smith",
    username: "KL20394",
    amount: 7500,
    status: "Completed",
    proof: "https://example.com/proof.jpg",
    level: "LEVEL 2",
    requesteddate: "02-Oct-2023",
  },
  {
    fromname: "Michael Johnson",
    username: "KL20395",
    amount: 10000,
    status: "Pending",
    proof: "https://example.com/proof.jpg",
    level: "LEVEL 3",
    requesteddate: "06-Jun-2024",
  },
  {
    fromname: "Emily Davis",
    username: "KL20396",
    amount: 15000,
    status: "Completed",
    proof: "https://example.com/proof.jpg",
    level: "LEVEL 4",
    requesteddate: "05-May-2023",
  },
  {
    fromname: "David Wilson",
    username: "KL20397",
    amount: 20000,
    status: "Pending",
    proof: "https://example.com/proof.jpg",
    level: "LEVEL 5",
    requesteddate: "16-Apr-2025",
  },
];
