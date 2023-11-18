import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./users";
import { Tasks } from "./tasks";

@Entity("TaskComments", { schema: "public" })
export class TaskComments {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  commentText: string;
  @Column()
  userId: string;
  @Column()
  taskId: string;
  @Column()
  timestamp: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Tasks)
  @JoinColumn({ name: "taskId" })
  task: Tasks;
}
