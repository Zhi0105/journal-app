import { AES, enc } from "crypto-js";
import { userInterface } from "@/types/auth/interface";
import { taskItemInterface } from "@/types/task/interface";
import _ from "lodash";
import dayjs from 'dayjs'

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
  return filteredItems
}

export const getTodoTask = (tasks: taskItemInterface[]) => {
  const filteredItems = _.filter(tasks, { status: "open" })
  return filteredItems
}
export const getOnProgressTask = (tasks: taskItemInterface[]) => {
  const filteredItems = _.filter(tasks, { status: "pending" })
  return filteredItems
}
export const getCompletedTask = (tasks: taskItemInterface[]) => {
  const filteredItems = _.filter(tasks, { status: "completed" })
  return filteredItems
}
export const setNewTaskList = (taskList: taskItemInterface[]) => {
  return [
    { id: "A", title: "To do", data: getTodoTask(taskList)},
    { id: "B", title: "On Progress", data: getOnProgressTask(taskList)},
    { id: "C", title: "Completed", data: getCompletedTask(taskList)}
  ]
}
export const getTodayTimeline = () => {
  return `${dayjs().format("dddd")}, ${dayjs().format("MMMM")} ${dayjs().format("DD")}`
}