import bcrypt from "bcryptjs"

export async function hashPassword(pw: string){
  return bcrypt.hash(pw, 10)
}