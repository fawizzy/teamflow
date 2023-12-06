import { connectionSource } from "../database/data-source";
import { Projects, Users } from "../database/entities";
import { ProjectMembers } from "../database/entities/projcectMembers";
import { projectMemberInterface } from "../interface/projectMembersInterface";
import { v4 as uuidv4 } from "uuid";

export const createProjectMemberService = async (
  projectMemberObject: projectMemberInterface
) => {
  try {
    const { projectId, userId, roleInProject } = projectMemberObject;
    const projectMemberRepository =
      connectionSource.getRepository(ProjectMembers);
    const userRepository = connectionSource.getRepository(Users);
    const projectRepository = connectionSource.getRepository(Projects);

    const projectMemberExists = await projectMemberRepository.findOne({
      where: { projectId, userId },
    });
    if (projectMemberExists) {
      return `user is already a member of project`;
    }

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
      },
    });

    const project = await projectRepository.findOne({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        projectName: true,
        description: true,
        startDate: true,
        endDate: true,
      },
    });

    if (!project) {
      return `project does not exist`;
    }

    if (!user) {
      return `user does not exist`;
    }
    const newProjectMember = new ProjectMembers();
    newProjectMember.id = uuidv4();
    newProjectMember.projectId = projectId;
    newProjectMember.userId = userId;
    newProjectMember.roleInProject = roleInProject;

    const savedProjectMember = await projectMemberRepository.save(
      newProjectMember
    );

    return savedProjectMember;
  } catch (error) {
    return error;
  }
};

export const deleteProjectMemberByIdService = async (id: string) => {
  try {
    const projectMemberRepository =
      connectionSource.getRepository(ProjectMembers);
    const projcectMemberToRemove = await projectMemberRepository.findOne({
      where: { id },
    });
    if (!projcectMemberToRemove) {
      return null;
    }
    const task = await projectMemberRepository.remove(projcectMemberToRemove);
    return task;
  } catch (error) {
    return error;
  }
};
