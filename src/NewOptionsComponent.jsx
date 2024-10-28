import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
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
      <>
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
      </>
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
      const response = await fetch(`/api/${selectedType}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
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
      const url = editingId ? `/api/${selectedType}/${editingId}` : `/api/${selectedType}`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const savedItem = await response.json();

      if (editingId) {
        setItems(items.map(item => item.id === editingId ? savedItem : item));
      } else {
        setItems([...items, savedItem]);
      }

      setFormData(initialFormState);
      setEditingId(null);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
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
      const response = await fetch(`/api/${selectedType}/${id}`, { 
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
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

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Erreur : {error}</div>;

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

        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <Tabs defaultValue="fr" className="w-full mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="fr">Français</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="es">Español</TabsTrigger>
            </TabsList>

            <TabsContent value="fr">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titre (FR)"
                  required
                  className="p-2 border rounded-md"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description (FR)"
                  className="p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="en">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleInputChange}
                  placeholder="Title (EN)"
                  className="p-2 border rounded-md"
                />
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  placeholder="Description (EN)"
                  className="p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="es">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="title_es"
                  value={formData.title_es}
                  onChange={handleInputChange}
                  placeholder="Título (ES)"
                  className="p-2 border rounded-md"
                />
                <textarea
                  name="description_es"
                  value={formData.description_es}
                  onChange={handleInputChange}
                  placeholder="Descripción (ES)"
                  className="p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4">
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="URL de l'image"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
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
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PasswordProtection>
  );
}

export { ImprovedOptionsInstallationsComponent2 as default, PasswordProtection };