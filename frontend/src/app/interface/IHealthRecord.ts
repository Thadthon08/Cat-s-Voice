// Interface for Animal data
import { Animal } from './IAnimal';

export interface HealthRecord {
  _id?: string;
  animal_id?: Animal;
  checkup_date?: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
}
