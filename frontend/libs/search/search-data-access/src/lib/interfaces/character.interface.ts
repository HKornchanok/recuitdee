export interface CharacterResponse {
  info: CharacterInfo;
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface CharacterFilter {
  searchQuery: string | undefined;
  gender: string | undefined;
  status: string | undefined;
}

export interface CharacterInfo {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
}

export interface CharacterPagination {
  count: number;
  pages: number;
  next: string;
  prev: string;
  filter: CharacterFilter;
}

export interface CharacterResults {
  pagination: CharacterPagination;
  results: Character[];
}

export type Gender = "Male" | "Female" | "Genderless" | "unknown";
export type Status = "Alive" | "Dead" | "unknown";
