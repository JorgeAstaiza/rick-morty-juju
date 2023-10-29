export interface Character {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: Location;
  location?: Location;
  image?: string;
  episode?: string[];
  url?: string;
  created?: Date;
}

export interface Location {
  name: string;
  url: string;
}

export interface Info {
  count?: number;
  next?: string;
  pages?: number;
  prev?: string;
}

export interface CharacterState {
  loading?: boolean;
  info?: Info;
  characters?: Character[];
  character?: Character;
}

export interface Search {
  value?: string;
}
