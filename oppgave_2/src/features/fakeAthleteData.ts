import type { Faker, AthleteProps } from "./types";

const fakeIDs: string[] = [
  "Arnold",
  "Peter Jackson",
  "Micka",
  "Fastest Way Only",
  "Jeuno",
]

const getRandomItem = <T>(items: T[]) => {
  const randomIndex = Math.floor(Math.random() * items.length);

  return items[randomIndex];
}

// Generate fake athlete
export const faker: Faker = {
  id: () => getRandomItem(fakeIDs),
}

export const getRandomAthlete = (count: number): AthleteProps[] =>
  Array.from({ length: count }, () => ({
    id: faker.id(),
  }));