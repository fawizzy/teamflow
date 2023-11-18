const jsonwebtoken = require("jsonwebtoken");

const secret_key = process.env.SECRET_KEY;

export const sign = (userId: string) => {
  const token = jsonwebtoken.sign({ userId }, secret_key);
  return token;
};

export const verify = (token: string) => {
  const decoded = jsonwebtoken.verify(token, secret_key);
  return decoded;
};
