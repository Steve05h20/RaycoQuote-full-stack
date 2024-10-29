import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { PlusCircle, X, Edit2, Trash2, Lock, LogOut, Image as ImageIcon, Globe, Loader, ChevronDown } from 'lucide-react';

// Password Protection Component
function PasswordProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'mkt2.0';

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') setIsAuthenticated(true);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="flex items-center justify-center mb-6">
              <Lock className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Accès Protégé</h2>
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
              >
                Accéder
              </button>
            </div>
          </form>
          <Link 
            className="mt-6 block text-center text-gray-600 hover:text-gray-800 transition-colors"
            to="/"
          >
            Retour au formulaire
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

const ItemForm = ({ onSubmit, initialData = {}, onCancel, isSubmitting }) => {
  const defaultValues = {
    title: '',
    title_en: '',
    title_es: '',
    description: '',
    description_en: '',
    description_es: '',
    image: ''
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData.id ? initialData : defaultValues
  });

  React.useEffect(() => {
    if (initialData.id) {
      reset(initialData);
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded-2xl shadow-lg mb-8">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <PlusCircle className="w-6 h-6 mr-2 text-blue-500" />
          {initialData.id ? 'Modifier l\'élément' : 'Ajouter un nouvel élément'}
        </h2>
      </div>

      <div className="p-8 space-y-8">
        {/* Image URL Field */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <ImageIcon className="w-6 h-6 mr-2 text-gray-500" />
            <label className="text-lg font-medium text-gray-700">URL de l'image</label>
          </div>
          <input
            {...register('image')}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* French Section */}
        <div className="bg-white p-6 rounded-xl border-2 border-blue-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold text-lg">FR</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Français</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title', { required: true })}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Titre en français"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Description détaillée en français"
              />
            </div>
          </div>
        </div>

        {/* English Section */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold text-lg">EN</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">English</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Title
              </label>
              <input
                {...register('title_en')}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
                placeholder="Title in English"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Description
              </label>
              <textarea
                {...register('description_en')}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
                placeholder="Detailed description in English"
              />
            </div>
          </div>
        </div>

        {/* Spanish Section */}
        <div className="bg-white p-6 rounded-xl border-2 border-yellow-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <span className="text-yellow-600 font-bold text-lg">ES</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Español</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Título
              </label>
              <input
                {...register('title_es')}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-lg"
                placeholder="Título en español"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Descripción
              </label>
              <textarea
                {...register('description_es')}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-lg"
                placeholder="Descripción detallada en español"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex justify-end space-x-4">
        {initialData.id && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 text-lg font-medium"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center text-lg font-medium"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Traitement...
            </>
          ) : (
            initialData.id ? 'Mettre à jour' : 'Ajouter'
          )}
        </button>
      </div>
    </form>
  );
};



// Main Component
function ModernOptionsInstallationsComponent() {
  const { i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('options');
  const [editingId, setEditingId] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });

  useEffect(() => {
    fetchItems();
  }, [selectedType]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/items?type=${selectedType}`);
      if (!response.ok) throw new Error(`Erreur HTTP! statut: ${response.status}`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setSubmitStatus({ loading: true, error: null });
      const url = editingId 
        ? `/api/items?type=${selectedType}&id=${editingId}`
        : `/api/items?type=${selectedType}`;
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error(`Erreur HTTP! statut: ${response.status}`);
      const savedItem = await response.json();
      
      setItems(prevItems => 
        editingId
          ? prevItems.map(item => item.id === editingId ? savedItem : item)
          : [...prevItems, savedItem]
      );
      
      setEditingId(null);
    } catch (err) {
      setSubmitStatus({ loading: false, error: err.message });
    } finally {
      setSubmitStatus({ loading: false, error: null });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    try {
      setSubmitStatus({ loading: true, error: null });
      const response = await fetch(`/api/items?type=${selectedType}&id=${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error(`Erreur HTTP! statut: ${response.status}`);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      setSubmitStatus({ loading: false, error: err.message });
    } finally {
      setSubmitStatus({ loading: false, error: null });
    }
  };

  const getLocalizedContent = (item, field) => {
    const lang = i18n.language;
    return item[`${field}_${lang}`] || item[field];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-blue-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Gestion des {selectedType === 'options' ? 'Options' : 'Installations'}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="p-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="options">Options</option>
                  <option value="installations">Installations</option>
                </select>
                <button
                  onClick={() => {
                    localStorage.removeItem('isAuthenticated');
                    window.location.reload();
                  }}
                  className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <ItemForm
            onSubmit={handleFormSubmit}
            initialData={editingId ? items.find(item => item.id === editingId) : {}}
            onCancel={() => setEditingId(null)}
            isSubmitting={submitStatus.loading}
          />

          {/* Items Grid */}
          <div className="grid grid-cols-1 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-1/4 bg-gray-50 p-6 flex items-center justify-center">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={getLocalizedContent(item, 'title')}
                        className="h-48 w-full object-cover object-left md:h-64  rounded-xl shadow-md" 
                      />
                    ) : (
                      <div className="w-full h-48 md:h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-3/4 p-6 flex flex-col">
                    {/* Language Tabs */}
                    <div className="flex space-x-2 mb-6">
                      {['FR', 'EN', 'ES'].map((lang) => (
                        <div 
                          key={lang}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            lang === 'FR' 
                              ? 'bg-blue-100 text-blue-600'
                              : lang === 'EN'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-yellow-100 text-yellow-600'
                          }`}
                        >
                          {lang}
                        </div>
                      ))}
                    </div>

                    {/* Content for each language */}
                    <div className="grid grid-cols-1 gap-8">
                      {/* French Content */}
                      <div>
                        <h3 className="text-lg font-semibold text-blue-600 mb-2">Français</h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>

                      {/* English Content */}
                      <div>
                        <h3 className="text-lg font-semibold text-green-600 mb-2">English</h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title_en}</h4>
                        <p className="text-gray-600">{item.description_en}</p>
                      </div>

                      {/* Spanish Content */}
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-600 mb-2">Español</h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title_es}</h4>
                        <p className="text-gray-600">{item.description_es}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setEditingId(item.id)}
                          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {items.length === 0 && !loading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="flex justify-center mb-4">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Aucun {selectedType === 'options' ? 'option' : 'installation'} disponible
              </h3>
              <p className="text-gray-600">
                Commencez par ajouter un nouvel élément en utilisant le formulaire ci-dessus.
              </p>
            </div>
          )}

          {/* Error Toast */}
          {error && (
            <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setError(null)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {submitStatus.loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center space-x-3">
                  <Loader className="w-6 h-6 text-blue-500 animate-spin" />
                  <p className="text-gray-700">Traitement en cours...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PasswordProtection>
  );
}

PasswordProtection.propTypes = {
  children: PropTypes.node.isRequired,
};

ItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export { ModernOptionsInstallationsComponent as default, PasswordProtection };