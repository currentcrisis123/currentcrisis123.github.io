import Editor from '../../components/Editor';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditCategory from '../../components/EditCategory';
import { Category } from '../../types/category';
import { Pencil } from 'lucide-react';
import { categoryService, articleService } from '../../services/api';

interface AddArticleProps {
  _title?: string;
  _author?: string;
  _content?: string;
  _categories?: string[]; // This should be an array of category names
  _id?: string; // For editing existing articles
}

function AddArticle({ _title = '', _author = '', _content = '', _categories = [], _id }: AddArticleProps) {
  const location = useLocation();
  const articleFromLocation = location.state?.article || {};
  
  const [editCategory, openEditCategory] = useState(false);
  const [title, setTitle] = useState(articleFromLocation._title || _title);
  const [author, setAuthor] = useState(articleFromLocation._author || _author);
  const [content, setContent] = useState(articleFromLocation._content || _content);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [clearEditorCache, setClearEditorCache] = useState<((skipConfirm: boolean) => void) | null>(null);
  const [invalidCategories, setInvalidCategories] = useState<string[]>([]);
  const [isEditMode] = useState<boolean>(Boolean(articleFromLocation._id || _id)); 

  useEffect(() => {
    const getCategories = async () => {
      try {
        const currentCategories = await categoryService.getCategories();
        setCategories(currentCategories || []);
        
        const categoriesToUse = articleFromLocation._categories || _categories;
        
        if (categoriesToUse && categoriesToUse.length > 0) {
          const validCategoryNames = currentCategories.map((cat: Category) => cat.name);
          const valid = categoriesToUse.filter((cat: string) => validCategoryNames.includes(cat));
          const invalid = categoriesToUse.filter((cat: string) => !validCategoryNames.includes(cat));
          
          setSelectedCategories(valid);
          
          if (invalid.length > 0) {
            setInvalidCategories(invalid);
            // console.warn(`Some categories no longer exist: ${invalid.join(', ')}`);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    }
    getCategories();
  }, [editCategory]);

  const handleEditCategory = () => {
    openEditCategory(!editCategory);
  };
  
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    }
  };

  const handleEditorContentChange = (editorContent: string) => {
    setContent(editorContent);
  };

  const handleSubmit = async () => {
    if (!title || !author || !content || selectedCategories.length === 0) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fill in all fields and select at least one category'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const validCategories = selectedCategories.filter(cat => 
        categories.some(existingCat => existingCat.name === cat)
      );
      
      const articleId = articleFromLocation._id || _id || Date.now().toString();
      const id = typeof articleId === 'string' ? parseInt(articleId) : articleId;
      
      const articleData = {
        id,
        title,
        author,
        content,
        tag: validCategories
      };      
      
      if (isEditMode) {
        try {
          await articleService.updateArticle(articleData);
        } catch (error) {
          throw error;
        }
      } else {
        await articleService.createArticle(articleData);
      }
      
      const successMessage = isEditMode ? 'Article updated successfully!' : 'Article published successfully!';
      
      setSubmitMessage({
        type: 'success',
        text: successMessage
      });

      setTitle('');
      setAuthor('');
      setContent('');
      setSelectedCategories([]);
        
      if (clearEditorCache) {
        clearEditorCache(true);
      }

    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: isEditMode 
          ? 'Failed to update article. Please try again.'
          : 'Failed to publish article. Please try again.'
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='px-10 pt-20 flex flex-row gap-2 h-[calc(100vh-110px)] w-full'>
      {/* ARTICLE FORM */}
      <div className='w-2/3 text-white'>
        <input 
          className="section p-2 mb-3 w-full rounded-lg bg-light-default/40 backdrop-blur-md" 
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          className="section p-2 mb-3 w-full rounded-lg bg-light-default/40 backdrop-blur-md" 
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />        
        <Editor 
          editorContentKey='add_article_editor_content'
          lastModifiedKey='add_article_last_modified'
          initialContent={content}
          onContentChange={handleEditorContentChange} 
          onClearReference={(clearFunc) => setClearEditorCache(() => clearFunc)}
        />
      </div>

      {/* CATEGORIES */}
      <div className='w-1/3 justify-start gap-2 flex flex-col'>     
        <form 
          className='bg-light-default/40 backdrop-blur-md rounded-lg p-4 w-full flex flex-col gap-y-2 overflow-y-auto text-white'
          onSubmit={(e) => e.preventDefault()}
        >            
          <div className='flex flex-row justify-between items-center'>
            <h1 className="text-2xl font-mohave font-bold">CATEGORIES</h1>
            <button 
              type="button"
              className='bg-cc-orange/80 hover:bg-cc-orange duration-500 text-white font-bayon rounded-full p-2'
              onClick={handleEditCategory}
            >
              <Pencil className='size-4' />
            </button>
          </div>
          
          {invalidCategories.length > 0 && (
            <div className="text-cc-red italic text-xs mb-2">
              Warning: Some previously assigned categories no longer exist and will be removed: {invalidCategories.join(', ')}
            </div>
          )}
          
          <div className='flex flex-row flex-wrap gap-2'>
            {categories.length === 0 ? (
              <div className="text-gray-800 italic text-xs">
                No categories found.
              </div>
            ) : (
              categories.map((_category, index) => (
                <div key={index} className="checkbox w-2/5">
                  <label className='font-mulish'>
                    <input 
                      type="checkbox" 
                      value={_category.name}
                      checked={selectedCategories.includes(_category.name)}
                      onChange={(e) => handleCategoryChange(_category.name, e.target.checked)}
                    />
                    {" "}
                    {_category.name}
                  </label>
                </div>
              ))
            )}
          </div>
          
          {submitMessage.text && (
            <div 
              className={`mt-2 p-2 rounded-lg font-mulish ${
              submitMessage.type === 'error' ? 'bg-std-red/20 text-std-red' : 'bg-std-green/20 text-[#2d6c2f]'
            }`}>
              {submitMessage.text}
            </div>
          )}
        </form>        
        
        <div className="flex justify-end w-full">
          <button 
            type="button" 
            className={`bg-cc-orange/80 text-white text-xl font-mohave font-bold rounded-lg px-3 py-1 duration-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cc-orange transition-colors'
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (isEditMode ? 'UPDATING...' : 'PUBLISHING...') : (isEditMode ? 'UPDATE' : 'PUBLISH')}
          </button>
        </div>
      </div>      
      
      {editCategory && (
        <div className='fixed top-0 left-0 w-full h-full bg-dark-default bg-opacity-60 flex items-center justify-center z-50'>
          <EditCategory onClose={handleEditCategory} />
        </div>
      )}
    </div>
  );
}

export default AddArticle;
