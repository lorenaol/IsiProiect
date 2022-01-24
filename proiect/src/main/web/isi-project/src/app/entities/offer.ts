import {User} from "@app/entities/user";
import {Camion} from "@app/entities/camion";

export class Offer {
  id?: string;
  user?: User;
  camion?: Camion | null | undefined;
  locPlecare?: string;
  locSosire?: string;
  dataPlecare?: Date;
  dataSosire?: Date;
  pretCamionGol?: number;
  pretCamionPlin?: number;
  status?: string;
  detalii?: string;
}
