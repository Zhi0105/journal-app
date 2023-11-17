import { useEffect, useCallback, useState } from 'react'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import { taskItemInterface } from '@/types/task/interface';
import { UseTaskStore } from "@/store/task";
import { HiCalendar } from "react-icons/hi";
import { getTodayTimeline } from '@/helpers/helpers';
import dayjs from 'dayjs'
import _ from 'lodash';


export const Today = () => {
  const { tasks } = UseTaskStore((state) => ({ tasks: state.tasks }));
  const [lists, setLists] = useState<taskItemInterface[]>([])
  const getTodayTasksCallback = useCallback((list: taskItemInterface[]) => {
    const pendingTasks = _.filter(list, (task) => task.status === 'open' || task.status === 'pending')
    const todayTasks = _.filter(pendingTasks, (task) => dayjs() >= dayjs(task.start_date) && dayjs() <= dayjs(task.end_date))
    const todayTasks2 = _.filter(pendingTasks, (task) => dayjs().isSame(dayjs(task.start_date), "day") && dayjs().isSame(dayjs(task.end_date), "day"))
    return [...todayTasks, ...todayTasks2]
  }, [])

  useEffect(() => {
    setLists(getTodayTasksCallback(tasks))
  }, [tasks, getTodayTasksCallback])


  if(!lists.length) {
    return null
  }
  
  return (
    <div className='today_timeline_main'>
      <h1 className='px-4 text-xs font-bold text-gray-600'>
        {getTodayTimeline()}
      </h1>
      <h1 className='px-4 font-bold text-2xl'>Today</h1>
        <Timeline>  
          {lists.length != 0 && lists.map((list: taskItemInterface, index: number) => {
            return (
              <TimelineEvent
                key={index}
                style={{ backgroundColor: "#f1f5f9", boxShadow: "10px", padding: "1rem 0 1rem 1rem", borderRadius: "1rem" }}
                contentStyle={{ borderRadius: ".5rem" }}
                title={list.name}
                icon={<HiCalendar size={15} className='text-gray-600' />}
                
              >
                {list.description}
            </TimelineEvent>
            )
          })}
          
      </Timeline>
    
    </div>
  )
}
