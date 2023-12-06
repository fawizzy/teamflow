import { connectionSource } from "../database/data-source";
import { Users } from "../database/entities";
import { loginInterface, userInterface } from "../interface/userInterface";
import { comparePassword, hashPassword } from "../utils/hashpassword.util";
import { sign } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";

export const getAllUsersService = async () => {
  try {
    const userRepository = connectionSource.getRepository(Users);
    const allUsers = await userRepository.find();
    return allUsers;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createUserService = async (userObject: userInterface) => {
  try {
    const { firstName, lastName, email, password, role } = userObject;
    const hashedPassword = await hashPassword(password);
    const userRepository = connectionSource.getRepository(Users);

    const emailExist = await userRepository.findOne({ where: { email } });
    if (emailExist) {
      return false;
    }
    const newUser = new Users();
    newUser.id = uuidv4();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.role = role;

    await userRepository.save(newUser);

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginService = async (loginObject: loginInterface) => {
  const { email, password } = loginObject;
  const userRepository = connectionSource.getRepository(Users);
  const emailExist = await userRepository.findOne({ where: { email } });
  if (!emailExist) {
    return "email is not registered";
  }
  const match = await comparePassword(password, emailExist.password);
  if (match) {
    return sign(emailExist.id);
  } else {
    return "invalid password";
  }
};

export const getUserByIdService = async (
  id: string
): Promise<userInterface | null> => {
  try {
    const userRepository = connectionSource.getRepository(Users);
    const user = await userRepository.findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
      where: { id },
    });
    if (!user) {
      return user;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUserByIdService = async (id: string) => {
  try {
    const userRepository = connectionSource.getRepository(Users);
    const userToRemove = await userRepository.findOne({ where: { id } });
    if (!userToRemove) {
      return null;
    }
    const task = await userRepository.remove(userToRemove);
    return task;
  } catch (error) {
    return error;
  }
};
