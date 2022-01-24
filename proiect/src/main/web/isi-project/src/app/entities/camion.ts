import {User} from "@app/entities/user";

export class Camion {
  id?: number;
  user?: User;
  status?: string;
  locatie?: string;
  volum?: number;
  gabarit?: number;
  greutate?: number;
  detalii?: string;
}
