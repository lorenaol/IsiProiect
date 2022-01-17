export class OfferModel {
  dataPlecare: string|undefined;
  dataSosire: string|undefined;
  locPlecare: string|undefined;
  locSosire: string|undefined;
  pretCamionGol: number|undefined;
  pretCamionPlin: number|undefined;
  marca: string|undefined
  volum: number|undefined;
  lungime: number|undefined;
  latime: number|undefined;
  inaltime: number|undefined;
  greutate: number|undefined;

  constructor(init?: Partial<OfferModel>) {
    Object.assign(this, init);
  }
}
