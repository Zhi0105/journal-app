import { useEffect } from "react";
import { useContext } from "react"
import { AuthContext } from "@/contexts/Authcontext"
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/navigation";

// import { useEffect } from "react";
// import { useUserStore } from "@/store/auth"
// import { AES, enc } from "crypto-js";

export const Panel = () => {
  const router = useRouter();
  const { user } = useUserStore((state) => ({ user: state.user }));

  
  useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
    if(!user) {
      router.push("/login")
    }
  }, [user, router])
  // useEffect(() => {
  //   if(user){
  //     const decryptedUser = AES.decrypt(user, "user").toString(enc.Utf8)
  //     const userdata = JSON.parse(decryptedUser)
  //     console.log(userdata)
  //   }
  // }, [user])

  const { logout } = useContext(AuthContext)

  return (
    <div className="dashboard_main flex min-h-screen flex-col items-center justify-center">
      <button onClick={() => logout()}>Log out</button>
    </div>
  )
}
