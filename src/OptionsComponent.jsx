import React, { useState, useEffect } from 'react';

function OptionsComponent() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/options');
      if (!response.ok) throw new Error('Erreur lors de la récupération des options');
      const data = await response.json();
      setOptions(data);
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
      const url = editingId ? `/api/options?id=${editingId}` : '/api/options';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'enregistrement de l\'option');
      }
      
      const savedOption = await response.json();
      
      if (editingId) {
        setOptions(options.map(opt => opt.id === editingId ? savedOption : opt));
      } else {
        setOptions([...options, savedOption]);
      }

      setFormData({ title: '', description: '', image: '' });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (option) => {
    setFormData(option);
    setEditingId(option.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/options?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression de l\'option');
      }
      setOptions(options.filter(opt => opt.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Options</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-100 p-4 rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Titre"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="URL de l'image"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editingId && (
            <button 
              onClick={() => {setEditingId(null); setFormData({ title: '', description: '', image: '' });}}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map(option => (
          <div key={option.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
            <p className="mb-2">{option.description}</p>
            {option.image && <img src={option.image} className="w-full h-40 object-cover mb-2 rounded" />}
            <div className="flex justify-between">
              <button 
                onClick={() => handleEdit(option)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button 
                onClick={() => handleDelete(option.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsComponent;