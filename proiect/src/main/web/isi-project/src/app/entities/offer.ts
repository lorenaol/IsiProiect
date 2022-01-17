import {User} from "@app/entities/user";
import {Camion} from "@app/entities/camion";

export class Offer {
  id?: string;
  user?: User;
  camion?: Camion;
  locPlecare?: string;
  locSosire?: string;
  dataPlecare?: string;
  dataSosire?: string;
  pretCamionGol?: number;
  pretCamionPlin?: number;
  detalii?: string;
}
