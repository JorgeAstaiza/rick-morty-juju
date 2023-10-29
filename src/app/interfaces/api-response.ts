import { Character, Info } from './characters';

export interface ApiResponseCharacter {
  info?: Info;
  results: Array<Character>;
}
