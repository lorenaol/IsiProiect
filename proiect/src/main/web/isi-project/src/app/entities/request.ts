import {User} from "@app/entities/user";

export class Request {
  id?: number;
  user?: User;
  locPlecare?: string;
  locSosire?: string;
  tipMarfa?: string;
  dataPlecare?: Date;
  dataMaximaPlecare?: Date;
  dataSosire?: Date;
  dataMaximaSosire?: Date;
  masa?: number;
  buget?: number;
  volum?: number;
  status?: string;
  detalii?: string;
}
