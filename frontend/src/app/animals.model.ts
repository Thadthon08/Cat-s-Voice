interface Animal {
    id: number;
    name: string;
    sex: 0 | 1; 
    ageYears: number;
    ageMonths?: number;
    ageDays?: number;
    breed: string;
    color: string;
    characteristics: string;
    personality: string;
    conditions: string[];
  }

  export type animal = Animal[]
