export class Country {
  id: number;
  name: string;
  capital: string;
  code: string;

  //declare private when need to be accessible within the class
  //private namecode : string
  get namecode() {
    return this.code + " - " + this.name;
  }
}
