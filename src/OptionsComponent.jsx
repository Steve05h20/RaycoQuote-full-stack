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
      console.log('Données du formulaire à envoyer:', formData);
      const response = await fetch('/api/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      console.log('Statut de la réponse:', response.status);
      if (!response.ok) throw new Error('Erreur lors de l\'enregistrement de l\'option');
      const newOption = await response.json();
      console.log('Nouvelle option reçue:', newOption);
      setOptions([...options, newOption]);
      setFormData({ title: '', description: '', image: '' });
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
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
      if (!response.ok) throw new Error('Erreur lors de la suppression de l\'option');
      setOptions(options.filter(opt => opt.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <h1>Gestion des Options</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Titre"
          required
          className='border-2'
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className='border-2'
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="URL de l'image"
          className='border-2'
        />
        <button className='bg-blue-500 p-5 m-5' type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Annuler</button>}
      </form>

      <div>
        {options.map(option => (
          <div key={option.id}>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            {option.image && <img src={option.image} alt={option.title} style={{maxWidth: '200px'}} />}
            <button onClick={() => handleEdit(option)}>Modifier</button>
            <button onClick={() => handleDelete(option.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsComponent;