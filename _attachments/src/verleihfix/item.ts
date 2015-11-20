export class Item {
  id: number;
  vendor: string;
  product: string;

  constructor(id: number, vendor: string, product: string) {
    this.id = id;
    this.vendor = vendor;
    this.product = product;
  }
}
