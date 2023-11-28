import { connectionSource } from "../database/data-source";
import { Tags } from "../database/entities";
import { v4 as uuidv4 } from "uuid";

export const createTagsService = async (tagName: string) => {
  try {
    const tagsRepository = connectionSource.getRepository(Tags);
    const newTag = new Tags();
    newTag.id = uuidv4();
    newTag.tagName = tagName;
    const tag = await tagsRepository.save(newTag);
  } catch (error) {}
};
