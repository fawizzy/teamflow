import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Tags", { schema: "public" })
export class Tags {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  tagName: string;
}
