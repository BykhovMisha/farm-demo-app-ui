export class AnimalModel {
  public id: number;
  public name: string;

  public constructor(animal: Partial<AnimalModel> & Pick<AnimalModel, "id">) {
    this.id = animal.id;
    this.name = animal.name ?? "";
  }
}
