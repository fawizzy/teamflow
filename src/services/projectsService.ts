import { connectionSource } from "../database/data-source";
import { ProjectMembers } from "../database/entities";
import { Projects } from "../database/entities/projects";
import { projectInterface } from "../interface/projectInterface";

export const createProjectService = async (
  projectObject: projectInterface
): Promise<any> => {
  try {
    const { projectName, description, startDate, endDate, status } =
      projectObject;
    const projectRepository = connectionSource.getRepository(Projects);

    const projectNameExists = await projectRepository.findOne({
      where: { projectName },
    });
    if (projectNameExists) {
      return `project with name ${projectName} already exists`;
    }
    if (new Date(startDate) > new Date(endDate)) {
      return `start date cannot be later than end date`;
    }

    const newProject = new Projects();
    newProject.projectName = projectName;
    newProject.description = description;
    newProject.startDate = new Date(startDate);
    newProject.endDate = new Date(endDate);
    newProject.status = status;

    const savedProject: Projects = await projectRepository.save(newProject);

    return savedProject;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProjectByIdService = async (id: string) => {
  try {
    const projectRepository = connectionSource.getRepository(Projects);
    const project = await projectRepository.findOne({ where: { id } });
    return project;
  } catch (error) {
    return error;
  }
};

export const getProjectByUserService = async (userId: string) => {
  try {
    const projectMemberRepository =
      connectionSource.getRepository(ProjectMembers);
    const userProjects = await projectMemberRepository.find({
      relations: {
        project: {},
      },
      where: { userId },
    });
    const projects = userProjects.map((project) => project.project);
    return projects;
  } catch (error) {
    return error;
  }
};
