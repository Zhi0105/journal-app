import { useState } from "react"
import { NewCategoryModal } from "./NewCategoryModal"
import { BiCategory } from 'react-icons/bi'
import { AiOutlinePoweroff, AiOutlineHome } from 'react-icons/ai'
import { IoIosCreate } from 'react-icons/io'
import { FcSettings } from 'react-icons/fc'
import Link from "next/link"
import Lottie from "lottie-react"
import book from '@_assets/book.json'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const Sidenav = ({ logout }: any) => {
  const [open, setOpen] = useState(false);
  const closeModal = ():void => setOpen(false);
  const lottie = {
    width: 100,
    height: 100 
  }

  return (
    <div className="sidenav_main w-auto px-4 xs:hidden sm:flex md:flex lg:flex xl:flex flex flex-col text-center text-sm shadow-2xl">
      
      <Popup
        open={open}
        onClose={closeModal}
        modal 
        nested
      >
        <NewCategoryModal close={closeModal} />
      </Popup>
      
      <ul className="flex flex-col gap-4">
        <li style={lottie}>
          <Lottie animationData={book}/>
        </li>
        <Link href="/dashboard" className="flex gap-2 cursor-pointer" target="_self">
          <span><AiOutlineHome /></span>
          <span>Dashboard</span>
        </Link>
        <li onClick={() => setOpen(true)} className="flex gap-2 cursor-pointer">
          <span><IoIosCreate /></span>
          <span>Create new</span>
          
       </li>  
        <Link href="/dashboard/category" className="flex gap-2 cursor-pointer" target="_self">
          <span><BiCategory /></span>
          <span>Category</span>
        </Link>
        <Link href="/dashboard/settings" className="flex gap-2 cursor-pointer" target="_self">
          <span><FcSettings /></span>
          <span>Settings</span>
        </Link>
        <li onClick={logout} className="flex gap-2 cursor-pointer">
          <span><AiOutlinePoweroff /></span>
          <span>Sign off</span>
        </li>
      </ul>
    </div> 
  )
}
