import { useState, useContext, FC } from 'react'
import { TaskContext } from '@/contexts/TaskContext';
import { useUserStore } from "@/store/auth"
import { taskItemInterface } from '@/types/task/interface';
import { categoryItemInterface } from '@/types/category/interface';
import { useRouter } from "next/navigation"
import { encodeURL } from "@/helpers/helpers";
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import tippy from 'tippy.js'
import _ from 'lodash'
import dayjs from 'dayjs'
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/dist/tippy.css';
import '@_app/tooltip.css'

interface eventInterface {
  title: string,
  start: Date | string ,
  end: Date | string
}

interface CalendarInterface {
  categories: categoryItemInterface[],
  tasks: taskItemInterface[]
}

export const Calendar:FC<CalendarInterface> = ({ categories, tasks }) => {
  const { updateTaskDates } = useContext(TaskContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
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
  const [ events ] = useState(getEvents(tasks))
  const router = useRouter()

  return (
    <Fullcalendar 
      editable
      selectable
      displayEventTime={false}
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      events={events}
      eventDidMount={(info) => {
        return tippy(info.el, {
          zIndex: 9999,
          // trigger: "focusin",
          allowHTML: true,
          content: `
            <div>
              <div class="tooltip-header">
                <p>(${_.filter(tasks, { name: `${info.event.title}` })[0].status})</p>
              </div>
              <p class="tooltip-description">${_.filter(tasks, { name: `${info.event.title}` })[0].description}</p>
            </div>
          `,
          animation: "scale-extreme",
        })
      }}
      eventDrop={(info) => {
          const task = _.filter(tasks, { name: info.event.title })
        if(token) {
          let payload = {
            category_id: Number(task[0].category_id),
            task_id: Number(task[0].id),
            start_date: dayjs(info.event.start, { utc: true }).format(),
            end_date: dayjs(info.event.end, { utc: true }).format(),
            user: token
          }
          updateTaskDates(payload)
        }
      }}
      eventClick={(info) => {
        const task = _.filter(tasks, { name: info.event.title })
        const category = _.filter(categories, { id: task[0].category_id })

        router.push(`/dashboard/category/${encodeURL(category[0])}`)
      }}
      // headerToolbar={{
      //   start: "today prev,next",
      //   center: "title",
      //   end: "dayGridMonth,timeGridWeek,timeGridDay"
      // }}
      height={"80vh"}
    />
  )
}
