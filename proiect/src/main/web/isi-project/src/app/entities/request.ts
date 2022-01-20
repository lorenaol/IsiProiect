import {User} from "@app/entities/user";

export class Request {
  id?: number;
  user?: User;
  locPlecare?: string;
  locSosire?: string;
  tipMarfa?: string;
  dataPlecare?: string;
  dataMaximaPlecare?: string;
  dataSosire?: string;
  dataMaximaSosire?: string;
  masa?: number;
  buget?: number;
  volum?: number;
  detalii?: string;
}
