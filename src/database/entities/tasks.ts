import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./users";
import { Projects } from "./projects";

@Entity("Tasks", { schema: "public" })
export class Tasks {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  taskName: string;
  @Column()
  description: string;
  @Column()
  userId: string;
  @Column()
  dueDate: Date;
  @Column()
  status: string;
  @Column()
  priority: string;
  @Column()
  projectId: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Projects)
  @JoinColumn({ name: "projectId" })
  project: Projects;
}
