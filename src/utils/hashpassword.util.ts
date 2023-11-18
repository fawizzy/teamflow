const bcrypt = require("bcrypt");
export const hashPassword = async (password: string) => {
  try {
    const saltRounds: Number = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};
