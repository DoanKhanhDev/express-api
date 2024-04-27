import { json } from "body-parser";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class media {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name?: string;

  @Column()
  type?: string;

  @Column("json")
  info?: object;

  @Column()
  path_alias?: string;

  @Column()
  published: boolean = false;
}
