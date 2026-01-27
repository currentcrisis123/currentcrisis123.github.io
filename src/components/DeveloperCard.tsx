import { SignedIn } from "@clerk/clerk-react";
import { developerService } from '../services/api'

import { Trash2 } from 'lucide-react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface DeveloperCardProps {
    photo?: string
    name: string
    linkedin?: string
    role: string
    leadership: boolean
}

function DeveloperCard({ photo, name, linkedin, role, leadership }: DeveloperCardProps) {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            try {
                await developerService.deleteDeveloper(name);

                window.location.reload();
            } catch (error) {
                alert('Failed to delete developer. Please try again.');
            }
        }
    };

    return (
        <div className={`flex flex-row rounded-lg ${leadership ? 'bg-gradient-to-br from-cc-orange to-[#c44eac]' : 'bg-gradient-to-br from-cc-blue to-[#c44eac]'} p-3 justify-between items-center hover:shadow-xl hover:text-white duration-500 transition-all`}>
            <div className='flex flex-row items-center overflow-hidden'>
                {photo && (
                    <img src={photo} alt={name} className='rounded-full size-12 object-cover mr-2' />
                )}

                <div className='flex flex-col overflow-hidden'>
                    <h1 className='font-mohave font-bold overflow-hidden'>{name}</h1>
                    <p className='font-mulish overflow-hidden text-xs'>{role}</p>
                </div>
            </div>
            <div className='flex items-center'>
                {linkedin && (
                    <a href={linkedin.toString()} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className='hover:text-linkedin-blue transition-all duration-500'/>
                    </a>
                )}
                <SignedIn>
                    <Trash2 
                        className='text-std-red/80 hover:text-std-red ml-1 cursor-pointer'
                        onClick={handleDelete}
                    />
                </SignedIn>
            </div>
        </div>
    )
}

export default DeveloperCard;