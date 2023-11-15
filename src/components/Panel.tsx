import { useState, useEffect } from "react";
import { useUserStore } from "@/store/auth";
import { userInterface } from "@/types/auth/interface";
import { UseCategoryStore } from "@/store/category";
import { UseTaskStore } from "@/store/task";
import { Calendar } from "./Partials/calendar/Calendar";
import Lottie from "lottie-react";
import hand from '@_assets/hand.json'
import welcome from '@_assets/welcome.json'



// HELPERS
import { getDecryptedUser, getTodoTask, getOnProgressTask, getCompletedTask } from "@/helpers/helpers";


export const Panel = () => {
  const { user } = useUserStore((state) => ({ user: state.user }));
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));
  const { tasks } = UseTaskStore((state) => ({ tasks: state.tasks }));
  const [mounted, setMounted] = useState<boolean>(false)
  const [userdata, setUserData] = useState<userInterface>()

  useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
    if(user){
      const userdata = getDecryptedUser(user)
      setUserData(userdata)
    } 
    setTimeout(() => setMounted(true), 200)
  }, [user, setMounted])


  const PanelSection = () => {
    return (
      <div className="px-8 mt-5">
        {tasks.length != 0 ?
            <Calendar categories={categories} tasks={tasks}/>
          :
            <EmptyCalendar />
        }
      </div>
    )
  }

  const EmptyCalendar = () => {
    return (
      <div className="w-full grid grid-cols-1 place-items-center">
        <div className="flex xs:flex-col sm:flex-col md:flex-row lg-flex-row xl:flex-row justify-center items-center gap-2">
          <div className="xs:w-full sm:w-full md:w-3/6 lg:w-3/6 w-3/6 flex flex-col gap-1 xs:order-2 sm:order-2 md:order-1 lg:order-1 xl:order-1 justify-center">
            <p>Hello from <span className="text-blue-600 font-bold">Filofax</span>,</p>
            <p className="indent-2">Create your first journal now!, kindly click the journal on the side navigator to create your first journal and start managing your tasks per category.</p>
            <p className="indent-2">After creating your category, create your first task for the category that you have been created. Enjoy!</p>
          </div>
          <div className="xs:order-1 sm:order-1 md:order-2 lg:order-2 xl:order-2" style={{ width:"40%", height: "40%" }}>
            <Lottie animationData={welcome}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard_main w-full p-2">
      <div className="bg-slate-200 rounded-md shadow-lg flex justify-between p-4">
        <div className="flex gap-2">
          {userdata &&
            <h1>How is your day?, {userdata?.username}</h1>
          }
          <span style={{ width: 25, height:25 }}>
            <Lottie animationData={hand} />
          </span>
        </div>
        <span className="font-bold">{tasks?.length} task(s)</span>
      </div>
        {tasks.length != 0 &&
          <div className="grid grid-cols-1 rounded-md shadow-lg mt-2">
          <div className="h-full grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 grid-cols-4 gap-4">
            <div className="indicator rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">Journal</div>
                <div className="flex justify-center gap-12">
                  <span className="text-4xl font-bold">{categories?.length}</span>
                </div>
              </div>
            </div>
            
            <div className="indicator rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">To do</div>
                <div className="flex justify-center gap-12">
                  <span className="text-4xl font-bold">{getTodoTask(tasks)?.length}</span>
                </div>
              </div>
            </div>

            <div className="indicator rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">In progress</div>
                <div className="flex justify-center gap-12">
                  <span className="text-4xl font-bold">{getOnProgressTask(tasks)?.length}</span>
                </div>
              </div>
            </div>

            <div className="indicator rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">Completed</div>
                <div className="flex justify-center gap-12">
                  <span className="text-4xl font-bold">{getCompletedTask(tasks)?.length}</span>
                </div>
              </div>
            </div>
            
          </div>
          </div>
        }
      {mounted &&
        <PanelSection />
      }
    </div>
  )
}
