import { useState, useEffect } from 'react'
import { ArrowDownRight, Plus, ChevronDown } from 'lucide-react'
import { SignedOut, SignInButton, SignedIn, SignOutButton } from "@clerk/clerk-react";
import DeveloperCard from '../components/DeveloperCard'

import { Developers } from '../types/developers'
import { developerService } from '../services/api'

import sponsors from '../assets/sponsors.svg'
import sandia from '../assets/sandia.svg'
import nsf from '../assets/nsf.svg'
import sbp from '../assets/sbp.svg'
import molzahn from '../assets/molzahn_photo.jpg'

const role = ['Developer', 'Game Designer', 'Graphic Designer']

function Contributors() {    const [hover, setHover] = useState(false)
    const [dev, setDev] = useState<Developers[]>([])
    const [name, setName] = useState("")
    const [linkedinUrl, setLinkedinUrl] = useState("")
    const [isLeadership, setIsLeadership] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState("")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchDevs = async () => {
            try {
                const data = await developerService.getDevelopers();
                setDev(data);
            } catch (err) {
                console.error('Failed to fetch devs:', err);
            }
        }

        fetchDevs();
    }, [])    
    
    const addDeveloper = async () => {
        if (!name || !selectedRole) {
            setSubmitError("Please provide name and select a role");
            return;
        }
        
        if (linkedinUrl && linkedinUrl.trim() !== '') {
            const linkedinRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
            if (!linkedinRegex.test(linkedinUrl)) {
                setSubmitError("Please enter a valid LinkedIn URL (format: https://www.linkedin.com/in/username)");
                return;
            }
        }

        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            const newDeveloper: { name: string; linkedin?: string; role: string; leadership: boolean } = {
                name,
                role: selectedRole,
                leadership: isLeadership
            };
            
            if (linkedinUrl && linkedinUrl.trim() !== '') {
                newDeveloper.linkedin = linkedinUrl.trim();
            }

            await developerService.createDeveloper(newDeveloper);

            setDev([...dev, newDeveloper]);

            setName("");
            setLinkedinUrl("");
            setSelectedRole("");
            setIsLeadership(false);
        } catch (error) {
            console.error("Error adding developer:", error);
            setSubmitError("Failed to add developer. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-36 w-full overflow-hidden">    
            <div className='flex flex-row space-x-2'>
                <img src={sponsors} className='size-20 md:size-48'/>
                <div className='flex flex-col font-mohave font-bold text-4xl md:text-8xl text-white'>
                    <h1>SPONSORS +</h1>
                    <h1>CONTRIBUTORS</h1>
                </div>
            </div>

            

            <div className='py-20 text-2xl md:5xl font-bold mx-auto text-center'>
                <h1 className='text-white font-mohave py-12 text-4xl md:text-6xl'>SPONSORS</h1>
                <div className='flex flex-row justify-center items-center space-x-8'>
                    <img src={sandia} className='w-[8rem] md:w-[18rem]' />
                    <h1 className='text-white font-mulish w-48 md:w-96'>Sandia National Laboratories</h1>
                </div>
                <div className='flex flex-row justify-center items-center space-x-8'>
                    <img src={nsf} className='w-[8rem] md:w-[18rem]' />
                    <h1 className='text-white font-mulish w-48 md:w-96'>National Science Foundation</h1>
                </div>
                <div className='flex flex-row justify-center items-center space-x-8'>
                    <img src={sbp} className='w-[8rem] md:w-[18rem]' />
                    <h1 className='text-white font-mulish w-48 md:w-96'>The Seth Bonder Program</h1>
                </div>
            </div>

            <div className='flex flex-col py-20 w-4/5 md:w-3/5 text-white justify-center'>
                <h1 className='text-cc-orange font-mohave font-bold text-4xl md:text-7xl text-center py-12'>WANT TO JOIN US?</h1>
                <p className='font-mulish text-lg mb-4'>For sponsors, please contact Dr. Daniel Molzahn via email molzahn@gatech.edu</p>
                <p className='font-mulish text-lg'>
                    For developers: current Georgia Tech students can enroll into the VIP Program 
                    for 1-3 credit hours each semester. This is a valid substitution for the Junior 
                    Design requirement. Contributors from all majors and backgrounds are welcome, more 
                    information on the GT VIP site below. We hope to hear from you soon!
                </p>
                <a href='https://vip.gatech.edu/teams/entry/1303/' target="_blank" rel="noopener noreferrer"
                    className='mx-auto my-10 flex flex-row items-center bg-cc-orange/80 hover:bg-cc-orange text-dark-default duration-500 font-mohave font-bold p-2 rounded-lg text-2xl w-40 group'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >   
                    <span>APPLY NOW</span>
                    <ArrowDownRight size={28} className={`ml-auto transition-all duration-300 ${hover ? '-rotate-90' : ''}`}/>
                </a>
                <p className='font-mulish text-lg'>
                    Not a developer or sponsor? No worries - simply exploring this website and playing 
                    the game is more than enough! Check back soon for updates as Current Crisis evolves.
                </p>
            </div>

            <div className='py-20 pb-40 w-4/5 md:w-3/5 justify-center mx-auto'>
                <h1 className='text-white font-mohave font-bold text-4xl md:text-7xl text-center py-12'>CONTRIBUTORS</h1>
                <div className='flex justify-end w-full'>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className='flex items-center text-cc-orange hover:underline duration-500 font-mulish p-2 rounded-lg text-xs'>
                                Sign In as Admin
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton>
                            <button className='flex items-center text-cc-orange hover:underline duration-500 font-mulish p-2 rounded-lg text-xs'>
                                Sign Out
                            </button>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <DeveloperCard
                    photo={molzahn}
                    name='Dr. Daniel Molzahn'
                    linkedin=''
                    role='Faculty Advisor'
                    leadership={true}
                />
                {role.map(r => (
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full'>
                        <h1 className='text-white font-mohave font-bold text-2xl col-span-2 md:col-span-3 pt-4'>{r}</h1>
                        {dev.sort((a, b) => {
                            if (a.leadership !== b.leadership) {
                                return a.leadership ? -1 : 1;
                            }

                            return a.name.localeCompare(b.name);
                        })
                        .filter((developer) => !developer.role || developer.role === r)
                        .map((developer, index) => (
                            <DeveloperCard 
                                key={index}
                                name={developer.name}
                                linkedin={developer.linkedin}
                                role={developer.role}
                                leadership={developer.leadership}
                            />
                        ))}
                    </div> 
                ))}
                
                {/* ADD NEW DEVELOPER */}
                    <SignedIn>
                        <div className='flex flex-col items-center pt-10'>
                            {submitError && (
                                <div className='mb-4 p-3 rounded-lg bg-std-red/20 text-std-red backdrop-blur-sm text-center w-full'>
                                    {submitError}
                                </div>
                            )}
                            
                            <div className='flex justify-center w-full'>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Enter new developer'
                                    className='rounded-lg bg-light-default/40 backdrop-blur-md p-2 text-white mr-2'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addDeveloper();
                                        }
                                    }}
                                />
                                <input
                                    value={linkedinUrl}
                                    onChange={(e) => setLinkedinUrl(e.target.value)}
                                    placeholder='LinkedIn URL (optional)'
                                    className='rounded-lg bg-light-default/40 backdrop-blur-md p-2 text-white mr-2'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addDeveloper();
                                        }
                                    }}
                                />
                                <div className="flex items-center mr-2">
                                    <div className="relative dropdown-container">
                                        <div 
                                            className='rounded-lg bg-light-default/40 backdrop-blur-md p-2 flex items-center justify-between w-48 cursor-pointer' 
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <span className={selectedRole ? "text-white" : "text-white/30"}>
                                                {selectedRole || "Select a role"}
                                            </span>
                                            <ChevronDown className={`ml-2 transform ${dropdownOpen ? 'rotate-180' : ''} transition-transform text-white/30`} size={16} />
                                        </div>
                                        
                                        {dropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-light-default/40 backdrop-blur-lg z-10">
                                                {role.map((r) => (
                                                    <div 
                                                        key={r}
                                                        className="p-2 text-white hover:bg-light-default/20 duration-500 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedRole(r);
                                                            setDropdownOpen(false);
                                                        }}
                                                    >
                                                        {r}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center mr-2">
                                    <label htmlFor="leadership-checkbox" className="text-white font-mulish mr-2">
                                        Leadership?
                                    </label>
                                    <input 
                                        type='checkbox'
                                        id="leadership-checkbox"
                                        checked={isLeadership}
                                        onChange={(e) => setIsLeadership(e.target.checked)}
                                    />
                                </div>
                                <button 
                                    className='bg-cc-orange/80 hover:bg-cc-orange text-white duration-500 p-2 rounded-lg mr-2 flex items-center'
                                    onClick={addDeveloper}
                                    disabled={isSubmitting}
                                >
                                    <Plus />
                                </button>
                            </div>
                        </div>
                    </SignedIn>
            </div>

            
        </div>
    )
}

export default Contributors;