import {Camion} from "@app/entities/camion";
import {Request} from "@app/entities/request";
import {Offer} from "@app/entities/offer";

export class Contract {
  id?: number;
  cerere? :Request
  oferta? : Offer
  camion?: Camion | null | undefined;
  cost? : number;
  termenPlata? : Date;
  locPlecare?: string;
  locDescarcare? : string;
  detaliiMarfa? : string;
  instructiuniSpeciale? : string;
}
