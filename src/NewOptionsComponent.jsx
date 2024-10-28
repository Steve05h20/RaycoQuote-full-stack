import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Composant de protection par mot de passe
function PasswordProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'mkt2.0';

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Accès Protégé</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez le mot de passe"
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Accéder
          </button>  
        </form>
        <Link className='bg-zinc-700 text-white my-24 px-5 py-2' to={"/"}>Retour au formulaire</Link>
      </div>
    );
  }

  return children;
}

PasswordProtection.propTypes = {
  children: PropTypes.node.isRequired
};

function ImprovedOptionsInstallationsComponent2() {
  const { i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('options');
  const [editingId, setEditingId] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });

  const initialFormState = {
    title: '',
    title_en: '',
    title_es: '',
    description: '',
    description_en: '',
    description_es: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchItems();
  }, [selectedType]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/items?type=${selectedType}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!formData.title.trim()) {
        throw new Error('Le titre en français est requis');
      }

      setSubmitStatus({ loading: true, error: null });
      
      const url = editingId 
        ? `/api/items?type=${selectedType}&id=${editingId}` 
        : `/api/items?type=${selectedType}`;
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const savedItem = await response.json();
      
      if (editingId) {
        setItems(prevItems => prevItems.map(item => item.id === editingId ? savedItem : item));
      } else {
        setItems(prevItems => [...prevItems, savedItem]);
      }

      setFormData(initialFormState);
      setEditingId(null);
      
    } catch (err) {
      setSubmitStatus({ loading: false, error: err.message });
    } finally {
      setSubmitStatus({ loading: false, error: null });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      title_en: item.title_en || '',
      title_es: item.title_es || '',
      description: item.description || '',
      description_en: item.description_en || '',
      description_es: item.description_es || '',
      image: item.image || ''
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    try {
      setSubmitStatus({ loading: true, error: null });
      const response = await fetch(`/api/items?type=${selectedType}&id=${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      setSubmitStatus({ loading: false, error: err.message });
    } finally {
      setSubmitStatus({ loading: false, error: null });
    }
  };

  const getLocalizedContent = (item, field) => {
    const lang = i18n.language;
    switch (lang) {
      case 'en':
        return item[`${field}_en`] || item[field];
      case 'es':
        return item[`${field}_es`] || item[field];
      default:
        return item[field];
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center py-4">Chargement...</div>
    </div>
  );

  return (
    <PasswordProtection>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des {selectedType === 'options' ? 'Options' : 'Installations'}
          </h1>
          <div className="flex space-x-4 items-center">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border rounded-md shadow-sm bg-white"
            >
              <option value="options">Options</option>
              <option value="installations">Installations</option>
            </select>
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                window.location.reload();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Section Français */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Français</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (FR) *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                  placeholder="Titre en français"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (FR)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  placeholder="Description en français"
                />
              </div>
            </div>
          </div>

          {/* Section Anglais */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">English</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title_en" className="block text-sm font-medium text-gray-700 mb-1">
                  Title (EN)
                </label>
                <input
                  id="title_en"
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Title in English"
                />
              </div>
              <div>
                <label htmlFor="description_en" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN)
                </label>
                <textarea
                  id="description_en"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  placeholder="Description in English"
                />
              </div>
            </div>
          </div>

          {/* Section Espagnol */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">Español</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title_es" className="block text-sm font-medium text-gray-700 mb-1">
                  Título (ES)
                </label>
                <input
                  id="title_es"
                  type="text"
                  name="title_es"
                  value={formData.title_es}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Título en español"
                />
              </div>
              <div>
                <label htmlFor="description_es" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (ES)
                </label>
                <textarea
                  id="description_es"
                  name="description_es"
                  value={formData.description_es}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  placeholder="Descripción en español"
                />
              </div>
            </div>
          </div>

          {/* Section Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              URL de l'image
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="URL de l'image"
            />
          </div>

          {submitStatus.error && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
              {submitStatus.error}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="submit"
              disabled={submitStatus.loading}
              className={`
                px-4 py-2 rounded-md text-white
                ${submitStatus.loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'}
                transition duration-300
              `}
            >
              {submitStatus.loading 
                ? 'Traitement...' 
                : (editingId ? 'Mettre à jour' : 'Ajouter')
              }
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData(initialFormState);
                }}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Annuler
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {getLocalizedContent(item, 'title')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getLocalizedContent(item, 'description')}
                  </p>
                </div>
                {item.image && (
                  <div className="mb-4">
                    <img 
                      src={item.image} 
                      alt={getLocalizedContent(item, 'title')}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                    disabled={submitStatus.loading}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    disabled={submitStatus.loading}
                  >
                    Supprimer
                  </button>
                </div>  </div>
            </div>
          ))}
        </div>

        {/* Message si aucun élément */}
        {items.length === 0 && !loading && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">
              Aucun {selectedType === 'options' ? 'option' : 'installation'} n'a été ajouté.
            </p>
          </div>
        )}

        {/* Message d'erreur global */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
              <div className="pl-3 ml-auto">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex text-red-400 hover:text-red-500"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Spinner de chargement pour les actions */}
        {submitStatus.loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Traitement en cours...</p>
            </div>
          </div>
        )}
      </div>
    </PasswordProtection>
  );
}

export { ImprovedOptionsInstallationsComponent2 as default, PasswordProtection };