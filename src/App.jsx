import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);


function App() {
  useGSAP(()=>{
    const tl= gsap.timeline();
    tl.from('h1',{
      duration: 0.8,
      y: 600,
      opacity: 0,
      delay: 0.3,
      scale: 3
    })
    tl.from('.ipBox',{
      y: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2
    })
    tl.from('.disp1',{
      y: 300,
      opacity: 0,
      duration: 0.6
    })
    tl.to('.disp1',{
      y: -100,
      opacity: 0,
      delay: 0.8,
      duration: 0.2
    })
    tl.from('.disp2',{
      y: 300,
      opacity: 0,
      
      duration: 0.6
    })
    tl.to('.disp2',{
      y: -100,
      opacity: 0,
      duration: 0.2,
      delay: 0.8
    })
    tl.from('.disp3',{
      y: 300,
      opacity: 0,
      duration: 0.6
    })

  })

  return (
    <>
    <div className='h-full min-h-screen bg-gray-800 pb-10 '>
      
        <div className='flex justify-center bg-gray-900 py-6 '>
        <h1 className='text-4xl  text-white font-semibold items-center'><span className='text-green-400'>W</span >ords<span className='text-green-400'>H</span>ub</h1>
        </div>
        <div className="flex justify-center">
          <div className="text-5xl text-white font-bold absolute mt-40 disp1">Stuck with a word ?</div>
          <div className="text-5xl text-white font-bold absolute mt-40 disp2">We got you covered</div>
          <div className="text-5xl text-white font-bold absolute mt-40 disp3">Type in the word you want to search</div>
        </div>
        <div className="flex justify-center ipBox">
          <input type="text" className='mt-80 w-3/4 md:w-3/5 lg:w-1/5 bg-gray-700 border-slate-50 border rounded-md h-12 text-lg text-white px-3 ' placeholder='Enter your word here...'/>
        </div>
       <div className="flex justify-center mt-10 ipBox">
       <button className='bg-green-400 text-white py-3 px-5 rounded-3xl font-semibold'>Search <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
       </div>
      </div>
    </>
  )
}

export default App
