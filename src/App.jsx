import { useState } from 'react'
import axios from 'axios';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);


function App() {
  const [query, setquery] = useState('')
  const [resObj, setresObj] = useState({});
  const [searched, setsearched] = useState(false);
  const [found, setfound] = useState(false);
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
  const fetchData =()=>{
    
    if (query===''){
      return;
    }
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then((res)=>{
      setresObj(res.data[0].meanings[0]);
      setsearched(true);
      setfound(true);

      // console.log(res);
      // console.log(res.data[0].meanings[0]);
      // console.log(res.data[0].meanings[0].definitions[0].definition);
      // console.log(res.data[0].meanings[0].definitions[0].synonyms);
    })
    .catch(err=>{
      setfound(false);
      console.log(err);
    })
  }

  return (
    <>
    <div className='h-full min-h-screen bg-gray-800 pb-10 '>
      
        <div className='flex justify-center bg-gray-900 py-6 '>
        <h1 className='text-4xl  text-white font-semibold items-center'><span className='text-green-400'>W</span >ords<span className='text-green-400'>H</span>ub</h1>
        </div>
        <div className="flex justify-center w-3/4 lg:w-1/2 mx-auto">
          <div className="text-5xl text-white font-bold absolute mt-40 disp1">Stuck with a word ?</div>
          <div className="text-5xl text-white font-bold absolute mt-40 disp2">We got you covered</div>
          <div className="text-5xl text-white font-bold absolute mt-40 disp3">Type in the word you want to search</div>
        </div>
        <div className="flex justify-center ipBox">
          <input type="text" onChange={(e)=>{setquery(e.target.value)}} className='mt-80 w-3/4 md:w-3/5 lg:w-1/5 bg-gray-700 border-slate-50 border rounded-md h-12 text-lg text-white px-3 ' placeholder='Enter your word here...'/>
        </div>
       <div className="flex justify-center mt-10 ipBox">
       <button className='bg-green-400 text-white py-3 px-5 rounded-3xl font-semibold' onClick={fetchData}>Search <FontAwesomeIcon icon={faMagnifyingGlass}  /></button>
       </div>
       {searched && !found && <div className="bg-gray-500  mx-auto w-3/4 lg:w-1/4 text-white text-lg mt-10 px-4 rounded-lg py-4">Sorry! We couldn&#39;t find what you were looking for :&#40;</div>}
       {searched && found &&  <div className="bg-gray-500  mx-auto w-3/4 lg:w-1/4 text-white text-lg mt-10 px-4 rounded-lg py-4">
          <div className="font-semibold text-2xl">Definition</div>
          <div className='text-justify'>{resObj.definitions[0].definition}</div>
          <div className="font-semibold text-2xl">Part of Speech</div>
          <div className='text-justify'>{resObj.partOfSpeech}</div>
          {resObj.definitions[0].synonyms.length>0 && 
          <div className="font-semibold text-2xl">Synonyms</div>
          }
          {resObj.definitions[0].synonyms.length>0 && 
          <div className='flex flex-wrap'>{resObj.definitions[0].synonyms.map((synonym,index)=>{
            return <div className='pr-1' key={index}>{index==0?(<span></span>):(<span>|</span>)} {synonym}</div>
          })}</div>
          }
          {resObj.definitions[0].antonyms.length>0 && 
          <div className='flex flex-wrap'>{resObj.definitions[0].antonyms.map((antonym,index)=>{
            return <div className='pr-1' key={index}>{index==0?(<span></span>):(<span>|</span>)} {antonym}</div>
          })}</div>
          }
       </div>}
      </div>
    </>
  )
}

export default App
