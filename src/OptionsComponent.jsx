import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PasswordProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'mkt2.0'; // Remplacez par votre mot de passe choisi

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
    return (<>
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

function ImprovedOptionsInstallationsComponent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [selectedType, setSelectedType] = useState('options');

  useEffect(() => {
    fetchItems();
  }, [selectedType]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`/api/${selectedType}`);
      if (!response.ok) throw new Error(`Erreur lors de la récupération des ${selectedType}`);
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/${selectedType}?id=${editingId}` : `/api/${selectedType}`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur lors de l'enregistrement de l'${selectedType}`);
      }

      const savedItem = await response.json();

      if (editingId) {
        setItems(items.map(item => item.id === editingId ? savedItem : item));
      } else {
        setItems([...items, savedItem]);
      }

      setFormData({ title: '', description: '', image: '' });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/${selectedType}?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur lors de la suppression de l'${selectedType}`);
      }
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
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
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Déconnexion
          </button>
        </div>

        <div className="mb-6 flex justify-center">
          <Link className='bg-zinc-700 text-white mx-5 my-10 px-5 py-2' to={"/"}>Retour au formulaire</Link>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-md shadow-sm bg-white text-gray-700"
          >
            <option value="options">Options</option>
            <option value="installations">Installations</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Titre"
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="URL de l'image"
              className="p-2 border rounded-md"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingId && (
              <button
                onClick={() => { setEditingId(null); setFormData({ title: '', description: '', image: '' }); }}
                className="ml-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Annuler
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <div className="w-1/3 bg-gray-200 flex items-center justify-center p-4">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover object-left" />
                ) : (
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                    <span className="text-3xl">?</span>
                  </div>
                )}
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition duration-300"
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

export default ImprovedOptionsInstallationsComponent;