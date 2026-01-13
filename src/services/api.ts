import axios from 'axios';

// This logs the API URL when the application starts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';
// console.log('API URL configured as:', API_URL);

export const patchNotesService = {
  createArticle: async (articleData: {
    version: string,
    date: string,
    content: string
  }) => {
    try {
      const dataToSend = articleData;
      const response = await axios.post(`${API_URL}/patch_notes`, dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },

  getAllArticles: async () => {
    try {
      const response = await axios.get(`${API_URL}/patch_notes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  deleteArticle: async (version: string) => {
    try {
      const articles = await axios.get(`${API_URL}/patch_notes`);
      const articleToDelete = articles.data.find((note: any) => note.version === version);
      
      if (!articleToDelete) {
        throw new Error('Patch note not found');
      }
      
      const response = await axios.delete(`${API_URL}/patch_notes/${articleToDelete._id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }
}

export const developerService = {
  createDeveloper: async (developerData: {
    name: string;
    linkedin?: string;
    role: string;
    leadership: boolean;
  }) => {
    try {
      const dataToSend = developerData;
      const response = await axios.post(`${API_URL}/developers`, dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating developer:', error);
      throw error;
    }
  },

  getDevelopers: async () => {
    try {
      const response = await axios.get(`${API_URL}/developers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching developers:', error);
      throw error;
    }
  },

  deleteDeveloper: async (name: string) => {
    try {
      const developers = await axios.get(`${API_URL}/developers`);
      const devToDelete = developers.data.find((dev: any) => dev.name === name);
      
      if (!devToDelete) {
        throw new Error('Developer not found');
      }
      
      const response = await axios.delete(`${API_URL}/developers/${devToDelete._id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting developer:', error);
      throw error;
    }
  }
}

export const articleService = {
  createArticle: async (articleData: {
    id: number;
    title: string;
    content: any;
    author: string;
    tag: string[];
  }) => {
    try {
      const response = await axios.post(`${API_URL}/articles`, articleData);
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },
  
  getAllArticles: async () => {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  updateArticle: async (articleData: 
    {
      id: string | number;
      title: string;
      author: string;
      content: string;
      tag: string[];
    }) => {
    try {
      const articles = await axios.get(`${API_URL}/articles`);
      const articleToUpdate = articles.data.find((article: any) => {
        const articleIdAsNumber = typeof article.id === 'string' ? parseInt(article.id) : article.id;
        const dataIdAsNumber = typeof articleData.id === 'string' ? parseInt(articleData.id) : articleData.id;
        return articleIdAsNumber === dataIdAsNumber;
      });

      if (!articleToUpdate) {
        throw new Error(`Article not found with id: ${articleData.id}`);
      }

      const response = await axios.put(`${API_URL}/articles/${articleToUpdate._id}`, articleData);
      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  },
  
  deleteArticle: async (id: string) => {
    try {
      const articles = await axios.get(`${API_URL}/articles`);
      const articleToDelete = articles.data.find((article: any) => article.id === parseInt(id) || article.id === id);
      
      if (!articleToDelete) {
        throw new Error('Article not found');
      }
      
      const response = await axios.delete(`${API_URL}/articles/${articleToDelete._id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  },
};

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (categoryData: { name: string }) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  deleteCategory: async (identifier: string) => {
    try {
      if (identifier && identifier.match(/^[0-9a-fA-F]{24}$/)) {
        const response = await axios.delete(`${API_URL}/categories/${identifier}`);
        return response.data;
      }
      
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      const categoryToDelete = categoriesResponse.data.find((category: any) => 
        category.name === identifier
      );

      if (!categoryToDelete) {
        throw new Error('Category not found');
      }

      const response = await axios.delete(`${API_URL}/categories/${categoryToDelete._id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
}
