import { useEffect, useState } from 'react';
import { Article } from '../types/article';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { articleService } from '../services/api';

interface AccordionProps {
  category: string;
  onArticleSelect?: (article: Article) => void;
  refreshTrigger?: number;
}

function Accordion({ category, onArticleSelect, refreshTrigger = 0 }: AccordionProps) {
    const [isOpen, setOpen] = useState(false);
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
    
    useEffect(() => {
        getArticles();
    }, [refreshTrigger]);
    
    const getArticles = async () => {
        try {
            const articles = await articleService.getAllArticles();
            articles.sort((a: Article, b: Article) => a.title.localeCompare(b.title));
            setAllArticles(articles || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setAllArticles([]);
        }
    }

    useEffect(() => {
        if (allArticles && allArticles.length > 0 && category !== 'All') {
            const filtered = allArticles.filter(article => article.tag.includes(category));
            setDisplayedArticles(filtered);
        } else if (category === 'All') {
            setDisplayedArticles(allArticles);
        } else {
            setDisplayedArticles([]);
        }
    }, [category, allArticles]);
    
    const toggleProject = () => {
        setOpen(!isOpen);
    };

    return (
        <>
        {/* ACCORDION SUMMARY */}
        <motion.div 
            className='flex flex-col p-2 rounded-lg my-2'
            layout
            transition={{layout: {duration: 0.3, ease: "easeInOut"}}}
        >
            <button onClick={() => toggleProject()} className="w-full text-left hover:text-white duration-500">
            <div className={`${isOpen ? 'py-2 text-white' : ''} transition duration-500 flex flex-row justify-between`}>
              <h2 className='font-mulish'>{category}</h2>
              <ChevronDown className={`${isOpen ? 'rotate-180' : ''} transition duration-500 text-white`}/>
            </div>
            </button>        
        </motion.div>     

        {/* ACCORDION BODY */}
        <AnimatePresence>
            {isOpen && (              
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden px-4 my-2"
              >
                {displayedArticles && displayedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {displayedArticles.map(article => (
                      <div key={article.id} className="border-l-2 border-white pl-3 py-1">                        
                        <p className="font-semibold text-white">{article.title}</p>
                        <div className="flex justify-between items-center mt-1 text-xs text-gray-800">
                          <span>By {article.author}</span>
                          <button 
                            onClick={() => onArticleSelect && onArticleSelect(article)} 
                            className="text-white hover:underline"
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-800 italic text-xs">No articles in this category yet.</p>
                )}
              </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}

export default Accordion;