import { useState, useEffect } from "react";
import { useUserStore } from "@/store/auth";
import { AES, enc } from "crypto-js";
import { userInterface } from "@/types/auth/interface";
import Lottie from "lottie-react";
import hand from '@_assets/hand.json'


export const Panel = () => {
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [userdata, setUserData] = useState<userInterface>()

  useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
    if(user){
      const decryptedUser = AES.decrypt(user, "user").toString(enc.Utf8)
      const userdata = JSON.parse(decryptedUser)
      setUserData(userdata)
    } 
   
  }, [user])

  return (
    <div className="dashboard_main w-full p-2">
      <div className="bg-slate-200 rounded-md shadow-lg flex gap-2 p-4">
        <h1>How is your day?, {userdata?.username}</h1>
        <span style={{ width: 25, height:25 }}>
          <Lottie animationData={hand} />
        </span>
      </div>
      <div className="grid grid-cols-1 rounded-md shadow-lg mt-2">
        <div className="h-full grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 grid-cols-4 gap-4">
          <div className="indicator rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">Categories</div>
              <div className="flex justify-center gap-12">
                <span className="text-4xl font-bold">20</span>
              </div>
            </div>
          </div>
          
          <div className="indicator rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">Tasks</div>
              <div className="flex justify-center gap-12">
                <span className="text-4xl font-bold">20</span>
              </div>
            </div>
          </div>

          <div className="indicator rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">Pendings</div>
              <div className="flex justify-center gap-12">
                <span className="text-4xl font-bold">20</span>
              </div>
            </div>
          </div>

          <div className="indicator rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">Completed</div>
              <div className="flex justify-center gap-12">
                <span className="text-4xl font-bold">20</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
