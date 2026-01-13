import { useState } from 'react'
import { ArrowDownRight } from 'lucide-react'

import events from '../assets/events.svg'
import events_1 from '../assets/events_1.png'
import events_3 from '../assets/events_3.png'
import events_4 from '../assets/events_4.png'

function Events() {
    const [hover, setHover] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-36 bg-dark-default overflow-hidden">
            <div className='flex flex-row space-x-2'>
                <img src={events} className='size-20 md:size-48'/>
                <div className='flex flex-col font-mohave font-bold text-4xl md:text-8xl text-white'>
                    <h1>EVENTS +</h1>
                    <h1>OUTREACH</h1>
                </div>
            </div>

            <div className='flex flex-col md:flex-row py-20 bg-dark-default w-4/5 justify-center items-start md:space-x-12'>
                <div className='flex flex-col text-4xl md:text-7xl'>
                    <h1 className='text-white font-mohave font-bold md:mb-4'>SETH BONDER</h1>
                    <h1 className='text-cc-orange font-mohave font-bold'>SUMMER CAMPS</h1>
                    <p className='text-white font-mulish text-lg my-4'>
                        The Seth Bonder Summer Camps are a bundle of week long introductory computer science 
                        initiatives held on Georgia Tech's campus. Aimed at teaching underprivileged high school 
                        students how to code in simple languages, the camps have offered their sponsorship in 
                        exchange for a thorough course of interactive modules pertaining to game development. 
                    </p> 
                    <p className='text-white font-mulish text-lg my-4'>
                        Our talented team of diverse developers have contributed to teaching the students about 
                        the basics of Unity, 3D art and computer graphics, and general game design practices, 
                        philosophies, and insights into how we made Current Crisis.
                    </p>                     
                </div>
                <img src={events_1}/>
            </div>

            <div className='flex flex-col py-20 w-4/5 justify-center items-start bg-dark-default md:gap-8'>
                <div className='flex flex-col md:flex-row md:space-x-12'>
                    <div className='flex flex-col text-4xl md:text-7xl'>
                        <h1 className='text-white font-mohave font-bold md:mb-4'>THE</h1>
                        <h1 className='text-cc-orange font-mohave font-bold'>DATASEUM</h1>
                        <p className='text-white font-mulish text-lg my-4'>
                            The Dataseum is Dr. Jessica Robert's vision for a museum dedicated to data and data 
                            interaction at Georgia Tech. The first installation of the Dataseum was opened in 
                            the GT Price Gilbert Library in Spring 2024 til early 2025, and featured a playable 
                            demo of Current Crisis.
                        </p>
                        <p className='text-white font-mulish text-lg my-4'>
                            The exhibition's theme is Local Sustainability, positing what data could tell us 
                            about environmental, social, and economic sustainability in the Atlanta area, in 
                            the present day, the past, and the future.
                        </p>
                    </div>
                    <img src={events_3} className='hidden md:flex'/>
                </div>
                <div className='flex flex-col md:flex-row md:space-x-12'>
                    <img src={events_4} className='py-4 md:py-0'/>
                    <div className='flex flex-col'>
                        <p className='text-white font-mulish text-lg mb-4'>
                            In our exhibition, we posited visitors with their initial insights on what balance 
                            they'd strike between safety, cost, and reliability in regards to power grid design, 
                            placing a red pin. After a run through of the game and a questionnaire, visitors were 
                            instructed to plot the blue pin where their actual triangulation of values lied, 
                            offering an introspective glimpse into the sacrifices all power grid design entails.
                        </p>
                        <p className='text-white font-mulish text-lg my-4'>
                            As one of our biggest outreach projects to date, the Dataseum was a massive success! 
                            You can learn more about the event below.
                        </p>
                        <a href='https://sites.gatech.edu/dataseum/' target="_blank" rel="noopener noreferrer"
                            className='flex flex-row bg-cc-orange/80 hover:bg-cc-orange text-dark-default duration-500 font-mohave font-bold p-2 justify-between rounded-lg text-2xl w-64 group'
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >   
                            MORE ON DATASEUM <ArrowDownRight size={28} className={`mx-1 transition-all duration-300 ${hover ? '-rotate-90' : ''}`}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events;