import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { ClipboardIcon, TrashIcon, PencilIcon } from 'lucide-react';

const PriceCalculatorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pricePerKm, setPricePerKm] = useState('0');
  const [kilometers, setKilometers] = useState('0');
  const [basePrice, setBasePrice] = useState('0');
  const [additionalItems, setAdditionalItems] = useState([]);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const resultRef = useRef(null);

  const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '' : number.toString();
  };

  const calculateTotal = () => {
    const kmCost = parseFloat(pricePerKm) * parseFloat(kilometers);
    const additionalCost = additionalItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const total = kmCost + parseFloat(basePrice) + additionalCost;
    return isNaN(total) ? '0' : total.toFixed(2);
  };

  const handleAddItem = () => {
    if (newItemLabel && newItemPrice) {
      if (editingIndex !== null) {
        const updatedItems = [...additionalItems];
        updatedItems[editingIndex] = { label: newItemLabel, price: formatNumber(newItemPrice) };
        setAdditionalItems(updatedItems);
        setEditingIndex(null);
      } else {
        setAdditionalItems([...additionalItems, { label: newItemLabel, price: formatNumber(newItemPrice) }]);
      }
      setNewItemLabel('');
      setNewItemPrice('');
      setShowAddItem(false);
    }
  };

  const handleEditItem = (index) => {
    const item = additionalItems[index];
    setNewItemLabel(item.label);
    setNewItemPrice(item.price);
    setEditingIndex(index);
    setShowAddItem(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = additionalItems.filter((_, i) => i !== index);
    setAdditionalItems(updatedItems);
  };

  const resetCalculator = () => {
    setPricePerKm('0');
    setKilometers('0');
    setBasePrice('0');
    setAdditionalItems([]);
    setNewItemLabel('');
    setNewItemPrice('');
    setShowAddItem(false);
    setEditingIndex(null);
  };

  const copyResult = () => {
    const result = resultRef.current;
    if (result) {
      const resultText = result.innerText;
      const detailedResult = `
Détails du calcul:
${resultText}
      `;
      navigator.clipboard.writeText(detailedResult)
        .then(() => alert('Résultat détaillé copié dans le presse-papiers!'))
        .catch(err => console.error('Erreur lors de la copie: ', err));
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ouvrir le calculateur
      </button>

      {isOpen && (
        <Draggable handle=".handle">
          <div className="fixed z-50 w-96 bg-white rounded-lg shadow-xl">
            <div className="handle bg-gray-200 px-4 py-2 rounded-t-lg cursor-move">
              <h3 className="text-lg font-medium text-gray-900">Calculateur de prix</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerKm">
                    Prix par km ($)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pricePerKm"
                    type="number"
                    value={pricePerKm}
                    onChange={(e) => setPricePerKm(formatNumber(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kilometers">
                    Kilomètres
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="kilometers"
                    type="number"
                    value={kilometers}
                    onChange={(e) => setKilometers(formatNumber(e.target.value))}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basePrice">
                  Prix de base ($)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="basePrice"
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(formatNumber(e.target.value))}
                />
              </div>
              {additionalItems.map((item, index) => (
                <div key={index} className="mb-4 flex justify-between items-center">
                  <span className="text-gray-700 font-bold">{item.label}:</span>
                  <span className="text-gray-700">${item.price}</span>
                  <div>
                    <button onClick={() => handleEditItem(index)} className="text-blue-500 mr-2">
                      <PencilIcon size={16} />
                    </button>
                    <button onClick={() => handleDeleteItem(index)} className="text-red-500">
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {!showAddItem && (
                <button
                  onClick={() => setShowAddItem(true)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  + Ajouter un élément
                </button>
              )}
              {showAddItem && (
                <div className="mt-4 p-4 border rounded-lg relative">
                  <button
                    onClick={() => {
                      setShowAddItem(false);
                      setEditingIndex(null);
                      setNewItemLabel('');
                      setNewItemPrice('');
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newItemLabel">
                      Label
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="newItemLabel"
                      type="text"
                      value={newItemLabel}
                      onChange={(e) => setNewItemLabel(e.target.value)}
                      placeholder="Ex: Repas"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newItemPrice">
                      Prix ($)
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="newItemPrice"
                      type="number"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(formatNumber(e.target.value))}
                    />
                  </div>
                  <button
                    onClick={handleAddItem}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {editingIndex !== null ? 'Modifier' : 'Ajouter'} l'élément
                  </button>
                </div>
              )}
              <div className="mt-4 text-right" ref={resultRef}>
                <p>Transport: ${(parseFloat(pricePerKm) * parseFloat(kilometers)).toFixed(2)}</p>
                <p>Base: ${parseFloat(basePrice).toFixed(2)}</p>
                {additionalItems.map((item, index) => (
                  <p key={index}>{item.label}: ${parseFloat(item.price).toFixed(2)}</p>
                ))}
                <p>Total des extras: ${additionalItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}</p>
                <strong className="text-lg">Total: ${calculateTotal()}</strong>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={resetCalculator}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={copyResult}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <ClipboardIcon size={16} className="inline mr-2" />
                  Copier le résultat
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default PriceCalculatorWidget;