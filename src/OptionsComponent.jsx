import React, { useState, useEffect } from 'react';

function OptionsComponent() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/options');
      if (!response.ok) throw new Error('Failed to fetch options');
      const data = await response.json();
      setOptions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createOption = async (newOption) => {
    try {
      const response = await fetch('/api/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOption)
      });
      if (!response.ok) throw new Error('Failed to create option');
      const createdOption = await response.json();
      setOptions([...options, createdOption]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateOption = async (id, updatedOption) => {
    try {
      const response = await fetch(`/api/options?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOption)
      });
      if (!response.ok) throw new Error('Failed to update option');
      const updated = await response.json();
      setOptions(options.map(opt => opt.id === id ? updated : opt));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteOption = async (id) => {
    try {
      const response = await fetch(`/api/options?id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete option');
      setOptions(options.filter(opt => opt.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Options</h1>
      {options.map(option => (
        <div key={option.id}>
          <h3>{option.title}</h3>
          <p>{option.description}</p>
          {option.image && <img src={option.image} alt={option.title} />}
          <button onClick={() => updateOption(option.id, { ...option, title: `Updated ${option.title}` })}>
            Update
          </button>
          <button onClick={() => deleteOption(option.id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => createOption({ title: 'New Option', description: 'Description', image: 'image-url' })}>
        Create New Option
      </button>
    </div>
  );
}

export default OptionsComponent;