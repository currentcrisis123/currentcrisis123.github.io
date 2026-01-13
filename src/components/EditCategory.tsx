import { useEffect, useState } from 'react';
import { X, Trash2, Save } from 'lucide-react';
import { Category } from '../types/category';
import { categoryService } from '../services/api';

interface EditCategoryProps {
  onClose?: () => void;
}

function EditCategory({ onClose }: EditCategoryProps) {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    }
    getCategories();
  }, []);  

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        const createdCategory = await categoryService.createCategory({ name: newCategory.trim() });
        
        setCategories(prevCategories => [...prevCategories, createdCategory]);
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDeleteCategory = async (categoryToDelete: Category) => {
    if (window.confirm(`Are you sure you want to delete "${categoryToDelete.name}"? Articles under this category will not be deleted. You can continue to view them under 'All'.`)) {
      try {
        await categoryService.deleteCategory(categoryToDelete._id || categoryToDelete.name);
        
        setCategories(prevCategories => 
          prevCategories.filter(category => category._id !== categoryToDelete._id)
        );
      } catch (error) {
        console.error('Error deleting category:', error);
      } finally {
      }
    }
  };

  return (
    <div className='bg-dark-default p-6 rounded-lg shadow-2xl w-2/5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl text-white font-mohave font-bold'>EDIT CATEGORIES</h1>
        {onClose && (
          <button 
            onClick={onClose}
            className='text-white hover:text-cc-orange duration-500'
          >
            <X size={24} />
          </button>
        )}
      </div>
      
      <div className='my-4'>
        <div className='flex space-x-2'>
          <input
            type='text'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newCategory.trim() !== '') {
                handleAddCategory();
              }
            }}
            placeholder='Create new category'
            className='p-2 rounded-lg flex-grow'
          />
            <button 
            onClick={handleAddCategory}
            className={`${newCategory.trim() === '' ? 'bg-gray-500 cursor-not-allowed' : 'bg-cc-orange/80 hover:bg-cc-orange'} duration-500 text-white p-2 rounded-lg`}
            disabled={newCategory.trim() === ''}
            >
              <Save size={20} />
            </button>
        </div>
      </div>
      
      <div className='max-h-96 overflow-y-auto'>
        {categories.length === 0 ? (
          <div className="text-gray-500 italic text-xs">
            No categories found.
          </div>
        ) : (
          categories.map((category, index) => (
            <div key={index} className='flex justify-between font-mulish items-center bg-light-default p-2 mb-2 rounded-lg'>
              <span>{category.name}</span>
              <button 
                onClick={() => handleDeleteCategory(category)}
                className='text-cc-red hover:text-c-red/80 duration-500'
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EditCategory;