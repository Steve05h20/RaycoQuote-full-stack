import React, { useState, useEffect } from 'react';

function OptionsInstallationsComponent() {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des {selectedType === 'options' ? 'Options' : 'Installations'}</h1>

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="options">Options</option>
        <option value="installations">Installations</option>
      </select>

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
              onClick={() => { setEditingId(null); setFormData({ title: '', description: '', image: '' }); }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
          )}
        </div>
      </form>



      <div className="border p-2 flex items-start relative text-[10pt]">
        <img src={item.image} alt={t(item.title)} className="w-16 object-cover object-left h-16 mr-2" />
        <div>
          <h3 className="font-bold text-[11pt]">{t(item.title)}</h3>
          <p>{t(item.description)}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handleEdit(item)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>






      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div className="border p-2 flex items-start relative text-[10pt]">
            <img src={item.image} alt={t(item.title)} className="w-16 object-cover object-left h-16 mr-2" />
            <div>
              <h3 className="font-bold text-[11pt]">{t(item.title)}</h3>
              <p>{t(item.description)}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>))}
      </div>
    </div>
  );
}

export default OptionsInstallationsComponent;