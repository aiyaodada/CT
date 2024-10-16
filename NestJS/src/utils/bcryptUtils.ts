import * as bcrypt from "bcryptjs";

/**
 * author: zhangyang
 * params: password 密码
 * description: 生成密码的哈希值
 * return: hash 返回密码
 * */
export const hashPassword = async (password: string): Promise<string> => {
  // 自动产生盐
  const salt = await bcrypt.genSalt();
  // 使用盐加密密码
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/**
 * author: zhangyang
 * params: password 密码
 * params: hashedPassword 哈希后的密码
 * description: 返回boolean
 * return: true / false
 * */
export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // 比较原始密码和哈希后的密码
  return await bcrypt.compare(password, hashedPassword);
};