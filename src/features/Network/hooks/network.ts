import { useState, useEffect } from "react";

export interface Member {
  id: string;
  name: string;
  level: number;
  position?: "Left" | "Right";
  children: Member[]; // always an array
}

// Sample names pool
const sampleNames = [
  "Aiden", "Sophia", "Liam", "Olivia",
  "Noah", "Emma", "Lucas", "Isabella",
  "Ethan", "Mia", "James", "Amelia",
  "Benjamin", "Charlotte", "Elijah", "Harper",
  "Henry", "Evelyn", "Alexander", "Abigail"
];

// Get next name in sequence
let nameIndex = 0;
const getNextName = (): string => {
  const name = sampleNames[nameIndex % sampleNames.length];
  nameIndex++;
  return name;
};

// Recursive tree generator (6 levels, last level = leaf)
const generateTree = (id: string, level: number, maxLevel: number): Member => {
  const name = getNextName();

  if (level >= maxLevel) return { id, name, level, children: [] };

  return {
    id,
    name,
    level,
    children: [
      { ...generateTree(id + "L", level + 1, maxLevel), position: "Left" },
      { ...generateTree(id + "R", level + 1, maxLevel), position: "Right" },
    ],
  };
};

export const useNetwork = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // generate dummy tree
    nameIndex = 0;
    const root = generateTree("ROOT", 1, 6);
    setMembers([root]);
    setLoading(false);
  }, []);

  return { members, loading };
};
