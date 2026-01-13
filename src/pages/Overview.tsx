import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ArrowDownRight } from 'lucide-react'

import logo from '../assets/logo_light.svg'
import home_1 from '../assets/home_1.svg'
import home_2 from '../assets/world.gif'
import home_3 from '../assets/home_3.svg'
import home_4 from '../assets/home_4.svg'

import wf from '../assets/wf.svg'
import hrc from '../assets/hrc.svg'
import eq from '../assets/eq.svg'
import fld from '../assets/fld.svg'

const word_list = [
    'Brighter.',
    'Better.',
    'Safer.'
]

function Overview() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const wordInterval = setInterval(() => {
            setFadeIn(false);

            setTimeout(() => {
                setCurrentWordIndex(prevIndex => 
                    prevIndex === word_list.length - 1 ? 0 : prevIndex + 1
                );
                setFadeIn(true);
            }, 500);
            
        }, 3000);

        return () => clearInterval(wordInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
            {/* BANNER */}
            <div className='h-screen flex flex-col justify-center items-center'>
                <div className='flex flex-row space-x-2'>
                    <img src={logo} className='size-20 md:size-48'/>
                    <div className='flex flex-col font-mohave font-bold text-4xl md:text-8xl text-white'>
                        <h1>CURRENT</h1>
                        <h1>CRISIS</h1>
                    </div>
                </div>              
                <div className='flex text-white py-4'>
                    <p className='font-mulish text-xl flex'>
                        Connecting
                        <span className='relative inline-block ml-2 w-24'>
                            <span 
                                className={`font-mulish text-xl text-cc-orange absolute left-0 transition-all duration-500 ${
                                    fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'
                                }`}
                            >
                                {word_list[currentWordIndex]}
                            </span>
                        </span>
                    </p>
                </div>
                <div className='space-x-2'>
                    <button 
                        className='w-[100px] bg-cc-orange/80 hover:bg-cc-orange duration-500 rounded-lg px-2 py-1 font-mulish'
                        onClick={() => {
                            navigate(`/play`);
                        }}
                    >
                        Play Online
                    </button>
                    <button 
                        className='w-[100px] bg-cc-orange/80 hover:bg-cc-orange duration-500 rounded-lg px-2 py-1 font-mulish'
                        onClick={() => {
                            window.open('https://currentcrisis.itch.io/current-crisis/download/3ojnVswbgjLm752y__jwT_Kpa9c_foiV_zIgvA5y', '_blank');
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
            
            {/* BODY */}
            <div className='w-full bg-dark-default'>
                <div className='flex flex-col md:flex-row py-20 w-4/5 justify-center items-start md:space-x-12 mx-auto'>
                    <img src={home_1} className='hidden md:flex'/>
                    <div className='flex flex-col text-4xl md:text-7xl'>
                        <h1 className='text-white font-mohave font-bold md:mb-4'>SIMULATING</h1>
                        <h1 className='text-cc-orange font-mohave font-bold'>POWER</h1>
                        <p className='text-white font-mulish text-lg my-4'>
                            Current Crisis is a free-to-play research simulation game, where <i>you</i> play as the power grid manager. 
                            It operates on a real-time power grid optimization simulation utilizing Gurobi with the aim to help 
                            better design power grids in the real world.
                        </p>                    
                        <button 
                            className='flex flex-row bg-cc-orange/80 hover:bg-cc-orange duration-500 font-mohave font-bold p-2 justify-between rounded-lg text-2xl w-64 my-4 group'
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/mission`);
                            }}
                        >
                            HEAR OUR MISSION <ArrowDownRight size={28} className={`mx-1 transition-all duration-300 ${hover ? '-rotate-90' : ''}`}/>
                        </button>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row py-20 w-4/5 justify-center items-start md:space-x-12 mx-auto'>
                    <div className='flex flex-col md:w-2/5 text-4xl md:text-7xl'>
                        <h1 className='text-white font-mohave font-bold md:mb-4'>SIMULATING</h1>
                        <h1 className='text-cc-red font-mohave font-bold'>DISASTERS</h1>
                        <p className='text-white font-mulish text-lg my-4'>
                            Operating a power grid alone is an immense challenge - now try battling the elements as you do! 
                        </p>         
                        <p className='text-white font-mulish text-lg my-4'>
                            You'll have to prepare for the disasters borne of mother nature - and the ones borne of your own grid.
                        </p>             
                        
                    </div>
                    <img src={home_2} className='md:w-2/5 mb-4'/>
                    <div className='flex flex-col space-y-9 md:w-1/5 text-2xl md:text-4xl'>
                        <div className='flex flex-row space-x-2'>
                            <img src={wf} />
                            <div>
                                <h1 className='text-cc-red font-mohave font-bold'>WILDFIRES</h1>
                                <p className='text-white font-mulish text-lg'>Implemented!</p>
                            </div>
                        </div>
                        <div className='flex flex-row space-x-2'>
                            <img src={hrc} />
                            <div>
                                <h1 className='text-white font-mohave font-bold'>HURRICANES</h1>
                                <p className='text-white font-mulish text-lg'>In Development</p>
                            </div>
                        </div>
                        <div className='flex flex-row space-x-2'>
                            <img src={eq} />
                            <div>
                                <h1 className='text-cc-orange font-mohave font-bold'>EARTHQUAKES</h1>
                                <p className='text-white font-mulish text-lg'>Planned</p>
                            </div>
                        </div>
                        <div className='flex flex-row space-x-2'>
                            <img src={fld} />
                            <div>
                                <h1 className='text-cc-blue font-mohave font-bold'>FLOODS</h1>
                                <p className='text-white font-mulish text-lg'>Planned</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row py-20 w-4/5 justify-center items-start md:space-x-12 mx-auto'>
                    <img src={home_3} className='hidden md:flex'/>
                    <div className='flex flex-col text-4xl md:text-7xl'>
                        <h1 className='text-white font-mohave font-bold md:mb-4'>SIMULATING</h1>
                        <h1 className='text-cc-blue font-mohave font-bold'>SOLUTIONS</h1>
                        <p className='text-white font-mulish text-lg my-4'>
                            Current Crisis aims to educate the public about critical power infrastructure, sustainable energy 
                            development, and the tradeoffs in grid design and disaster mitigation.
                        </p>                    
                        <button 
                            className='flex flex-row bg-cc-blue/80 hover:bg-cc-blue duration-500 font-mohave font-bold p-2 justify-between rounded-lg text-2xl w-48 my-4 group'
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/events`);
                            }}
                        >
                            VIEW EVENTS <ArrowDownRight size={28} className={`mx-1 transition-all duration-300 ${hover ? '-rotate-90' : ''}`}/>
                        </button>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row py-20 w-4/5 justify-center items-start md:space-x-12 mx-auto'>
                    <div className='flex flex-col text-4xl md:text-7xl'>
                        <h1 className='text-white font-mohave font-bold md:mb-4'>GAME</h1>
                        <h1 className='text-cc-orange font-mohave font-bold'>UPDATES</h1>
                        <p className='text-white font-mulish text-lg my-4'>
                            Current Crisis aims to educate the public about critical power infrastructure, sustainable energy 
                            development, and the tradeoffs in grid design and disaster mitigation.
                        </p>                    
                        <button 
                            className='flex flex-row bg-cc-orange/80 hover:bg-cc-orange duration-500 font-mohave font-bold p-2 justify-between rounded-lg text-2xl w-64 my-4 group'
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/patch_notes`);
                            }}
                        >
                            READ PATCH NOTES <ArrowDownRight size={28} className={`mx-1 transition-all duration-300 ${hover ? '-rotate-90' : ''}`}/>
                        </button>
                    </div>
                    <img src={home_4} className='hidden md:flex'/>
                </div>
            </div>
        </div>
    );
}

export default Overview;