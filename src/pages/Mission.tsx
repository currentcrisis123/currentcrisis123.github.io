import { useState } from 'react'

import { ArrowDownRight } from 'lucide-react'

import mission from '../assets/mission.svg'
import mission_1 from '../assets/mission_1.svg'
import mission_2 from '../assets/mission_2.svg'
import mission_3 from '../assets/mission_3.svg'
import mission_4 from '../assets/mission_4.svg'
import mission_5 from '../assets/mission_5.svg'

function Mission() {
    const [hover, setHover] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-36 bg-dark-default overflow-hidden">
            <div className='flex flex-row space-x-2'>
                <img src={mission} className='size-20 md:size-48'/>
                <div className='flex flex-col font-mohave font-bold text-4xl md:text-8xl text-white'>
                    <h1>OUR</h1>
                    <h1>MISSION</h1>
                </div>
            </div>

            <div className='flex flex-col md:flex-row py-20 bg-dark-default w-4/5 justify-center items-start md:space-x-12'>
                <div className='flex flex-col text-4xl md:text-7xl'>
                    <h1 className='text-white font-mohave font-bold md:mb-4'>FIRST...</h1>
                    <h1 className='text-cc-orange font-mohave font-bold'>WHO ARE WE?</h1>
                    <p className='text-white font-mulish text-lg my-4'>
                        Current Crisis is a Vertically Integrated Project (VIP) developed at the Georgia Institute of 
                        Technology, led by Dr. Daniel Molzahn of the Electrical Engineering department. In short, we're 
                        a humble team of interdisciplinary student developers!
                    </p>                    
                </div>
                <img src={mission_1} className='py-4 md:py-0'/>
            </div>

            <div className='flex flex-row py-20 bg-dark-default w-4/5 justify-center items-start md:space-x-12'>
                <img src={mission_2} className='hidden md:flex'/>
                <div className='flex flex-col text-4xl md:text-7xl'>
                    <h1 className='text-white font-mohave font-bold md:mb-4'>A WORLD</h1>
                    <h1 className='text-cc-red font-mohave font-bold'>AFLAME</h1>
                    <p className='text-white font-mulish text-lg md:my-4'>
                        The reliability of electric power grids is challenged by the rapidly increasing frequency and severity 
                        of natural disasters. Operators of electric power systems must address the rapidly increasing frequency 
                        of severe natural disasters driven by accelerating climate change. It's a vicious cycle, where grid failures 
                        fuel grid failures, and grid failures fuel disasters.
                    </p>         
                    <p className='text-white font-mulish text-lg my-4'>
                        But there <i>are</i> solutions! Research efforts have developed many approaches for mitigating the impacts of natural 
                        disasters, such as shutting off power lines to avoid igniting wildfires and hardening electric infrastructure 
                        by installing seawalls and microgrids as well as undergrounding power lines.
                    </p>             
                </div>
            </div>

            <div className='flex flex-row py-20 bg-dark-default w-4/5 justify-center items-start space-x-12'>
                <div className='flex flex-col text-4xl md:text-7xl'>
                    <h1 className='text-white font-mohave font-bold md:mb-4'>IF WE HAVE ANSWERS,</h1>
                    <h1 className='text-cc-blue font-mohave font-bold'>WHAT'S THE PROBLEM?</h1>
                    <p className='text-white font-mulish text-lg my-4'>
                        While these solutions prove effective, practical implementations of these approaches require outreach to build 
                        public acceptance of the associated disruptive actions and expenses. Another implementation challenge is the lack 
                        of detailed datasets containing plausible solutions to resiliency-related optimization problems, which would be 
                        valuable for training machine learning models. 
                    </p>                    
                </div>
                <img src={mission_3} className='hidden md:flex'/>
            </div>

            <div className='flex flex-col md:flex-row py-20 bg-dark-default w-4/5 justify-center items-start md:space-x-12'>
                <img src={mission_4} className='py-4 md:py-0'/>
                <div className='flex flex-col text-4xl md:text-7xl'>
                    <h1 className='text-white font-mohave font-bold md:mb-4'>THE POWER</h1>
                    <h1 className='text-cc-orange font-mohave font-bold'>OF PLAY</h1>
                    <p className='text-white font-mulish text-lg my-4'>
                        By developing and publicizing a simulation style video game, this project will simultaneously 
                        address both of these challenges, thus improving the resiliency of our electric infrastructure.
                    </p>
                    <p className='text-white font-mulish text-lg my-4'>
                        Current Crisis is a simulation style video game which puts the player in the role of a power 
                        system operator tasked with managing the grid during extreme events. The game is developed in 
                        Unity with grid optimization simulations in Gurobi, and is planned to be playable via browser.
                    </p>
                    <p className='text-white font-mulish text-lg my-4'>
                        The project primarily aims to educate the public about critical power infrastructure, sustainable 
                        energy development, and the tradeoffs in grid design and disaster mitigation. Future iterations will 
                        use data collected from players to train machine learning algorithms to help engineers better prepare 
                        for and respond to actual disaster scenarios.
                    </p>
                </div>
                
            </div>

            <div className='flex flex-row py-20 bg-dark-default w-4/5 justify-center items-start space-x-12'> 
                <div className='flex flex-col text-4xl md:text-7xl'>
                    <h1 className='text-white font-mohave font-bold md:mb-4'>THE JOURNEY</h1>
                    <h1 className='text-cc-orange font-mohave font-bold'>AHEAD</h1>
                    <p className='text-white font-mulish text-lg my-4'>
                        You'd be right to approach the prospect of aiding pertinent research with data from a 
                        videogame with some skepticism. After all, this project is realistically only a little over 
                        a third of the way through it's projected lifetime.
                    </p>
                    <p className='text-white font-mulish text-lg my-4'>
                        That's why we strive to make Current Crisis into a game that not only collects relevant, 
                        useful data, but also offers a realistic and pragmatic look at the ways we interact with our 
                        grid and the environment. For a better look into the real research implications of this work 
                        and player data collection, check out the in depth VIP motivation below.
                    </p>
                    <a href='https://molzahn.github.io/pubs/VIP_Team_Description.pdf' target="_blank" rel="noopener noreferrer"
                        className='flex flex-row bg-cc-orange/80 hover:bg-cc-orange duration-500 font-mohave font-bold p-2 justify-between rounded-lg text-2xl w-64 my-4 group'
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        READ FULL MOTIVATION <ArrowDownRight size={28} className={`mx-1 transition-all duration-300 ${hover ? '-rotate-90' : ''}`}/>
                    </a>
                </div>
                <img src={mission_5} className='hidden md:flex'/>
            </div>
        </div>
    )
}

export default Mission;