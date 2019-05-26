import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ICreateCharacterRequest {
  name: string;
  pcClass: string;
}

export interface ICharacter extends ICreateCharacterRequest {
  id: number;
}

@Entity()
export class Character implements ICreateCharacterRequest {
  @PrimaryGeneratedColumn()
  public readonly id?: number;

  @Column()
  public name: string = "";

  @Column()
  public pcClass: string = "";
}
