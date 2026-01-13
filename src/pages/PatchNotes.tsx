import { useState, useEffect } from 'react'
import { SignedIn } from "@clerk/clerk-react";
import { Trash2 } from 'lucide-react';
import Editor from '../components/Editor';
import ReactQuill from "react-quill-new";

import { PatchNote } from '../types/patch_notes';
import { patchNotesService } from '../services/api';

import patch_notes from '../assets/patch_notes.svg'

function PatchNotes() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [patchNote, setPatchNote] = useState<PatchNote[]>([])
    const [version, setVersion] = useState("")
    const [date, setDate] = useState(formattedDate);
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)    
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [clearEditorCache, setClearEditorCache] = useState<((skipConfirm: boolean) => void) | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await patchNotesService.getAllArticles();
                setPatchNote(data);
            } catch (err) {
                console.error('Failed to fetch notes:', err);
            }
        }

        fetchNotes();
    }, [])

    const handleEditorContentChange = (editorContent: string) => {
        setContent(editorContent);
    };
    
    const handlePost = async () => {
        if (!version || !date || !content) {
            setSubmitError("Ensure all fields are filled");
            return;
        }
        
        if (content === "<p><br></p>" || content === "") {
            setSubmitError("");
            return;
        }
        
        // version format (xx.xx.xx)
        const versionRegex = /^\d{2}\.\d{2}\.\d{2}$/;
        if (!versionRegex.test(version)) {
            setSubmitError("Version number must be in format xx.xx.xx (e.g., 00.00.00)");
            return;
        }
        
        setIsSubmitting(true);
        setSubmitError(null);
                
        try {
            const newArticle = {
                version: version,
                date: date,
                content: content
            };
        
            await patchNotesService.createArticle(newArticle);
        
            setPatchNote([...patchNote, newArticle]);
        
            setVersion("");
            setDate(date);
            setContent("");

            if (clearEditorCache) {
                clearEditorCache(true);
            }
        } catch (error) {
            setSubmitError("Failed to add article. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }    
    
    const handleDelete = async (version: string) => {
        if (window.confirm(`Are you sure you want to delete version "${version}"? This action cannot be undone.`)) {
            try {
                await patchNotesService.deleteArticle(version);
                // alert('Patch note deleted successfully!');
                window.location.reload();
            } catch (error) {
                // console.error('Error deleting patch note:', error);
                alert('Failed to delete patch note. Please try again.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-36 overflow-hidden">
            <div className='flex flex-row space-x-2'>
                <img src={patch_notes} className='size-20 md:size-48'/>
                <div className='flex flex-col font-mohave font-bold text-4xl md:text-8xl text-white'>
                    <h1>PATCH</h1>
                    <h1>NOTES</h1>
                </div>
            </div>

            {/* ADD PATCH NOTES */}
            <SignedIn>
                <div className='flex flex-col mt-20 w-4/5 justify-center items-start gap-2 mx-auto'>
                    {submitError && (
                        <div className='mb-4 p-3 rounded-lg bg-std-red/20 text-std-red backdrop-blur-sm text-center w-full font-mulish text-md'>
                            {submitError}
                        </div>
                    )}

                    <div className='flex flex-row justify-between w-full'>
                        <div>                        
                        <label htmlFor='version_number' className="text-white font-mulish mr-2">
                            Version:
                        </label>
                        <input
                            title="Enter version number" 
                            id="version_number"
                            placeholder='xx.xx.xx'
                            pattern="\d{2}\.\d{2}\.\d{2}"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            className='rounded-lg bg-light-default/40 backdrop-blur-md p-2 text-white mr-2' 
                        />
                        <input
                            type='date'
                            id='post_date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='rounded-lg bg-light-default/40 backdrop-blur-md p-2 text-white mr-2' 
                        />
                        </div>

                        <button 
                            onClick={handlePost}
                            disabled={isSubmitting}
                            className='font-mohave font-bold text-white bg-cc-orange/80 hover:bg-cc-orange duration-500 px-3 py-1 rounded-lg text-xl disabled:opacity-50'
                        >
                            POST
                        </button>
                    </div>

                    <div className='w-full h-96'>
                        <Editor 
                            editorContentKey='patch_notes_editor_content'
                            lastModifiedKey='patch_notes_last_modified'
                            onContentChange={handleEditorContentChange}
                            initialContent={content}
                            onClearReference={(clearFunc) => setClearEditorCache(() => clearFunc)}
                        />
                    </div>
                </div>
            </SignedIn>
            
            <div className='py-20 w-full flex flex-col items-center'>
            {patchNote.length > 0 ? patchNote
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((note, index) => (
                <div key={note._id || index} className='my-4 w-4/5 text-white'>
                    <div className='flex flex-row font-mohave font-bold text-4xl md:text-5xl justify-between items-end'>
                        <h1>VERSION {note.version}</h1>
                        <p>{note.date}</p>
                    </div>
                    <ReactQuill
                        theme="snow"
                        value={note.content}
                        readOnly={true}
                        modules={{
                            toolbar: false,
                        }}
                        formats={[
                            "header",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "color",
                            "background",
                            "script",
                            "blockquote",
                            "code-block",
                            "list",
                            "indent",
                            "link",
                            "image",
                            "formula",
                            "align",
                            "font",
                        ]}
                    />        
                    <SignedIn>
                        <button 
                            onClick={() => handleDelete(note.version)}
                            className='hover:bg-gray-500/50 transition-colors rounded-lg p-2'
                        >
                            <Trash2 className='text-2xl text-cc-red/80 hover:text-cc-red duration-500'/>
                        </button>
                    </SignedIn>
                    <hr className='my-4 text-dark-default'/>
                </div>
            )) : 
                <div className='w-4/5'>
                    <p className='mb-4 p-3 rounded-lg bg-std-red/20 text-std-red backdrop-blur-sm text-center w-full font-mulish text-md'>No patch notes available...yet!</p>
                </div>
            }
            </div>
        </div>
    )
}

export default PatchNotes