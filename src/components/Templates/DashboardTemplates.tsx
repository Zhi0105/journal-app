import { useEffect } from "react";
import { useContext } from "react"
import { AuthContext } from "@/contexts/Authcontext"
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Sidenav } from "../Partials/Sidenav"
import { CategoryProvider } from "@/providers/CategoryProvider";

export const DashboardTemplates = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const { user } = useUserStore((state) => ({ user: state.user }));
    const { logout } = useContext(AuthContext)

    useEffect(() => {  // HANDLE USER AUTHENTICATION REDIRECT TO DASHBOARD IF AUTHENTICATED
      if(!user) {
        router.push("/login")
      }
    }, [user, router])

  return (
    <div className="dashboard_template_main bg-white min-h-screen w-screen flex">
      <CategoryProvider>
        <Sidenav logout={logout} />
        {children}
      </CategoryProvider>
    </div>
  )
}