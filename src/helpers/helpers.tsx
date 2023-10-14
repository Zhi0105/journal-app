import { AES, enc } from "crypto-js";
import { userInterface } from "@/types/auth/interface";


export const EncryptUser = ( user: userInterface ):string => {
  const encryptedUser = AES.encrypt(JSON.stringify({ ...user }), "user").toString()
  return encryptedUser
}

export const getDecryptedUser = (user: string):userInterface => {
  const decryptedUser = AES.decrypt(user, "user").toString(enc.Utf8)
  const userdata = JSON.parse(decryptedUser)

  return userdata
}