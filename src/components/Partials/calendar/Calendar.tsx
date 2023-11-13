import { useState } from 'react'
import { UseCategoryStore } from "@/store/category";
import { UseTaskStore } from "@/store/task";
import { taskItemInterface } from '@/types/task/interface';
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import _ from 'lodash'
import dayjs from 'dayjs'

interface eventInterface {
  title: string,
  start: Date | string ,
  end: Date | string
}

export const Calendar = () => {
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));
  const { tasks } = UseTaskStore((state) => ({ tasks: state.tasks }));
  const getEvents = (tasklist: taskItemInterface[]) => {
    const events:eventInterface[] = []
    const pendingTasks = _.filter(tasklist, (task) => task.status === 'open' || task.status === 'pending')
    _.map(pendingTasks, (task) => {
        events.push({
          title: task.name,
          start: dayjs(task?.start_date!).toDate(), 
          end: dayjs(task?.end_date!).toDate()
        })
    })
    return events
  }
  const [ events, setEvents ] = useState(getEvents(tasks))
  return (
    <Fullcalendar 
      editable
      selectable
      displayEventTime={false}
      events={events}
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      // headerToolbar={{
      //   start: "today prev,next",
      //   center: "title",
      //   end: "dayGridMonth,timeGridWeek,timeGridDay"
      // }}
      height={"80vh"}
    />
  )
}
