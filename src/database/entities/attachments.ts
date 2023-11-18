import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./users";
import { Projects } from "./projects";
import { Tasks } from "./tasks";

@Entity("Attachments", { schema: "public" })
export class Attachments {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  fileName: string;
  @Column()
  filePath: string;
  @Column()
  uploadDate: Date;
  @Column("uuid")
  taskId: string;
  @Column("uuid")
  projectId: string;
  @Column("uuid")
  uploadedBy: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "uploadedBy" })
  user: Users;

  @ManyToOne(() => Projects)
  @JoinColumn({ name: "projectId" })
  project: Projects;

  @ManyToOne(() => Tasks)
  @JoinColumn({ name: "taskId" })
  Task: Tasks;
}
