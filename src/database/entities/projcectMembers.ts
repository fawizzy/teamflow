import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./users";
import { Projects } from "./projects";

@Entity("ProjectMembers", { schema: "public" })
export class ProjectMembers {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  projectId: string;
  @Column()
  userId: string;
  @Column()
  roleInProject: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Projects)
  @JoinColumn({ name: "projectId" })
  project: Projects;
}
