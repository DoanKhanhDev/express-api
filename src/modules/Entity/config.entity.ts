import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class config {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar", { length: 20 })
  key?: string;

  @Column("simple-array")
  value?: string[];
}
