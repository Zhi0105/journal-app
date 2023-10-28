import { AES, enc } from "crypto-js";
import { userInterface } from "@/types/auth/interface";
import { taskItemInterface } from "@/types/task/interface";
import _ from "lodash";

export const EncryptUser = ( user: userInterface ):string => {
  const encryptedUser = AES.encrypt(JSON.stringify({ ...user }), "user").toString()
  return encryptedUser
}
export const getDecryptedUser = (user: string):userInterface => {
  const decryptedUser = AES.decrypt(user, "user").toString(enc.Utf8)
  const userdata = JSON.parse(decryptedUser)

  return userdata
}
export const encodeURL = (value: any): string => {
  return encodeURIComponent(JSON.stringify(value))
}
export const decodeURL = (value: string) => {
  return JSON.parse(decodeURIComponent(value))
}
export const IfhasTask = (tasks: taskItemInterface[], category_id: number) => {
  return _.findIndex(tasks, (task) => { return task.category_id === category_id })
}
export const getCategoryTaskLength = (tasks: taskItemInterface[], category_id: number) => {
  const filteredItems = _.filter(tasks, {category_id})
  return filteredItems.length
}
export const getCategoryTasks = (tasks: taskItemInterface[], category_id: number) => {
  const filteredItems = _.filter(tasks, {category_id})
  console.log(filteredItems)
  return filteredItems
}