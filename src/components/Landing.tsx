import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import Lottie from 'lottie-react'
import journal from '@_assets/journal.json'
import Link from 'next/link'

export const Landing = () => {
  return (
    <div className="min-h-screen w-screen grid grid-cols-1 place-items-center">
      <section 
        className="
          xs:w-3/5 sm:min-w-1/2 md:min-w-1/2 w-full 
          xs:h-5/6 flex flex-col md:flex-row justify-center items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 px-8"
      >  
        <Lottie animationData={journal} className='w-full h-full' width={100} height={100}/>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Filofax (Journal App)
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              Journaling app to easily log and view journal entries.
              Time management: Get it all done.
            </p>
            <Link 
              href={"/login"}
              target='_top'
              type="button" 
              className="text-gray-900 bg-white flex items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
            >
              <BsFillArrowRightCircleFill width={50} height={50} />
              Get Started
            </Link>
        </div>
      
      </section>
    </div>
  )
}
