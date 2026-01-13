import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../components/Accordion';
import { Category } from '../../types/category';
import { Article } from '../../types/article';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { articleService, categoryService } from '../../services/api';
import ReactQuill from "react-quill-new";

function Doc() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [refreshCounter, setRefreshCounter] = useState(0); 
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        
        fetchCategories();
    }, []);

    const handleArticleSelect = (article: Article) => {
        setSelectedArticle(article);
    };    
    
    const deleteArticle = async (article: Article) => {
        if (window.confirm(`Are you sure you want to delete "${article.title}"? This action cannot be undone.`)) {
            try {
                await articleService.deleteArticle(article.id);
                setRefreshCounter(prev => prev + 1);
                setSelectedArticle(null);
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const handleEditArticle = (article: any) => {
        navigate('/admin/add-article', {
            state: {
                article: {
                    _id: article.id,
                    _mongoId: article._id,
                    _title: article.title,
                    _author: article.author,
                    _content: article.content,
                    _categories: article.tag
                }
            }
        });
    };

    return (
        <>
        <div className="flex flex-row h-[calc(100vh-20px)] px-10 pt-20">
            {/* ACCORDION LIST */}
            <div className='w-1/3 bg-light-default/40 backdrop-blur-md rounded-lg p-2 overflow-y-auto'>
                <Accordion
                    key={categories.length} 
                    category="All"
                    onArticleSelect={handleArticleSelect}
                    refreshTrigger={refreshCounter}
                />
                {Object.values(categories).map((_category, index) => (
                    <Accordion 
                        key={index} 
                        category={_category.name}
                        onArticleSelect={handleArticleSelect}
                        refreshTrigger={refreshCounter}
                    />
                ))}
            </div>

            {/* ARTICLE VIEW */}
            <div id="article-content" className='w-2/3 p-4 overflow-y-auto'> 
                {selectedArticle ? (
                    <div className='text-white overflow-y-auto'>
                        <div className='flex flex-row justify-between items-center'>
                            <div>
                                <h1 className="text-4xl font-mulish mb-2 text-white">{selectedArticle.title}</h1>                        
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                    <span>By {selectedArticle.author}</span>
                                    <div className="flex flex-wrap gap-1 items-center">
                                        {selectedArticle.tag.map((tag, index) => (
                                            <span key={index} className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full px-2 py-1 text-xs transtion-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>                            
                            
                            <div>
                                <button 
                                    className='hover:bg-gray-500/50 duration-500 rounded-lg p-2 ml-1'
                                    onClick={() => handleEditArticle(selectedArticle)}
                                >
                                    <Pencil className='text-2xl text-cc-orange/80 hover:text-cc-orange duration-500' />
                                </button>
                                <button 
                                    className='hover:bg-gray-500/50 duration-500 rounded-lg p-2'
                                    onClick={() => deleteArticle(selectedArticle)}
                                >
                                    <Trash2 className='text-2xl text-cc-red/80 hover:text-cc-red duration-500' />
                                </button>
                            </div>
                        </div>
                        <div className="prose max-w-none text-lg leading-relaxed">
                            <ReactQuill
                                theme="snow"
                                value={selectedArticle.content}
                                readOnly={true}
                                modules={{
                                    toolbar: false,
                                }}
                                formats={[
                                    "font",
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
                                    "align"
                                ]}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='text-white'>
                        <h1 className="text-4xl font-mohave font-bold">DOCUMENTATION</h1>
                        <p className="font-mulish">Select a document from the left.</p>
                    </div>
                )}
            </div>
        </div>
        <button 
            className='absolute bottom-4 right-4 rounded-full bg-cc-orange/80 hover:bg-cc-orange transition-colors p-2 text-white font-bold cursor-pointer'
            onClick={() => window.location.href = "/admin/add-article"}
        >
            <Plus className='text-2xl' />
        </button>
        </>
    );
}

export default Doc;