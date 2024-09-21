import React, { useState, useEffect } from 'react';

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

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Gestion des {selectedType === 'options' ? 'Options' : 'Installations'}
      </h1>

      <div className="mb-6 flex justify-center">
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
                <img src={item.image} alt={item.title} className="w-full h-auto object-cover object-left" />
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
  );
}

export default ImprovedOptionsInstallationsComponent;