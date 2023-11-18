import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Projects", { schema: "public" })
export class Projects {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  projectName: string;
  @Column()
  description: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  status: string;
}
