// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useForm } from 'react-hook-form';
// import PropTypes from 'prop-types';
// import { PlusCircle, X, Edit2, Trash2, Lock, LogOut, Image as ImageIcon, Globe, Loader, ChevronDown } from 'lucide-react';

// // Password Protection Component
// function PasswordProtection({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState('');
//   const correctPassword = 'mkt2.0';

//   useEffect(() => {
//     const auth = localStorage.getItem('isAuthenticated');
//     if (auth === 'true') setIsAuthenticated(true);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === correctPassword) {
//       setIsAuthenticated(true);
//       localStorage.setItem('isAuthenticated', 'true');
//     } else {
//       alert('Mot de passe incorrect');
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//             <div className="flex items-center justify-center mb-6">
//               <Lock className="w-12 h-12 text-blue-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Accès Protégé</h2>
//             <div className="space-y-4">
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Entrez le mot de passe"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <button 
//                 type="submit" 
//                 className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
//               >
//                 Accéder
//               </button>
//             </div>
//           </form>
//           <Link 
//             className="mt-6 block text-center text-gray-600 hover:text-gray-800 transition-colors"
//             to="/"
//           >
//             Retour au formulaire
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return children;
// }

// const ItemForm = ({ onSubmit, initialData = {}, onCancel, isSubmitting }) => {
//   const defaultValues = {
//     title: '',
//     title_en: '',
//     title_es: '',
//     description: '',
//     description_en: '',
//     description_es: '',
//     image: ''
//   };

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: initialData.id ? initialData : defaultValues
//   });

//   React.useEffect(() => {
//     if (initialData.id) {
//       reset(initialData);
//     } else {
//       reset(defaultValues);
//     }
//   }, [initialData, reset]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded-2xl shadow-lg mb-8">
//       <div className="p-6 border-b border-gray-100">
//         <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
//           <PlusCircle className="w-6 h-6 mr-2 text-blue-500" />
//           {initialData.id ? 'Modifier l\'élément' : 'Ajouter un nouvel élément'}
//         </h2>
//       </div>

//       <div className="p-8 space-y-8">
//         {/* Image URL Field */}
//         <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//           <div className="flex items-center mb-4">
//             <ImageIcon className="w-6 h-6 mr-2 text-gray-500" />
//             <label className="text-lg font-medium text-gray-700">URL de l'image</label>
//           </div>
//           <input
//             {...register('image')}
//             className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
//             placeholder="https://example.com/image.jpg"
//           />
//         </div>

//         {/* French Section */}
//         <div className="bg-white p-6 rounded-xl border-2 border-blue-100">
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//               <span className="text-blue-600 font-bold text-lg">FR</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800">Français</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-3">
//                 Titre <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register('title', { required: true })}
//                 className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
//                 placeholder="Titre en français"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-3">
//                 Description
//               </label>
//               <textarea
//                 {...register('description')}
//                 rows={4}
//                 className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
//                 placeholder="Description détaillée en français"
//               />
//             </div>
//           </div>
//         </div>

//         {/* English Section */}
//         <div className="bg-white p-6 rounded-xl border-2 border-green-100">
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
//               <span className="text-green-600 font-bold text-lg">EN</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800">English</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-3">
//                 Title
//               </label>
//               <input
//                 {...register('title_en')}
//                 className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
//                 placeholder="Title in English"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-3">
//                 Description
//               </label>
//               <textarea
//                 {...register('description_en')}
//                 rows={4}
//                 className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
//                 placeholder="Detailed description in English"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Spanish Section */}
//         <div className="bg-white p-6 rounded-xl border-2 border-yellow-100">
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
//               <span className="text-yellow-600 font-bold text-lg">ES</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800">Español</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-3">
//                 Título
//               </label>
//               <input
//                 {...register('title_es')}
//                 className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-lg"
//                 placeholder="Título en español"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-3">
//                 Descripción
//               </label>
//               <textarea
//                 {...register('description_es')}
//                 rows={4}
//                 className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-lg"
//                 placeholder="Descripción detallada en español"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex justify-end space-x-4">
//         {initialData.id && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 text-lg font-medium"
//           >
//             Annuler
//           </button>
//         )}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center text-lg font-medium"
//         >
//           {isSubmitting ? (
//             <>
//               <Loader className="w-5 h-5 mr-2 animate-spin" />
//               Traitement...
//             </>
//           ) : (
//             initialData.id ? 'Mettre à jour' : 'Ajouter'
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };



// // Main Component
// function ModernOptionsInstallationsComponent() {
//   const { i18n } = useTranslation();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedType, setSelectedType] = useState('options');
//   const [editingId, setEditingId] = useState(null);
//   const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });

//   useEffect(() => {
//     fetchItems();
//   }, [selectedType]);

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/items?type=${selectedType}`);
//       if (!response.ok) throw new Error(`Erreur HTTP! statut: ${response.status}`);
//       const data = await response.json();
//       setItems(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFormSubmit = async (data) => {
//     try {
//       setSubmitStatus({ loading: true, error: null });
//       const url = editingId 
//         ? `/api/items?type=${selectedType}&id=${editingId}`
//         : `/api/items?type=${selectedType}`;
      
//       const response = await fetch(url, {
//         method: editingId ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error(`Erreur HTTP! statut: ${response.status}`);
//       const savedItem = await response.json();
      
//       setItems(prevItems => 
//         editingId
//           ? prevItems.map(item => item.id === editingId ? savedItem : item)
//           : [...prevItems, savedItem]
//       );
      
//       setEditingId(null);
//     } catch (err) {
//       setSubmitStatus({ loading: false, error: err.message });
//     } finally {
//       setSubmitStatus({ loading: false, error: null });
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
//     try {
//       setSubmitStatus({ loading: true, error: null });
//       const response = await fetch(`/api/items?type=${selectedType}&id=${id}`, {
//         method: 'DELETE'
//       });
      
//       if (!response.ok) throw new Error(`Erreur HTTP! statut: ${response.status}`);
//       setItems(prevItems => prevItems.filter(item => item.id !== id));
//     } catch (err) {
//       setSubmitStatus({ loading: false, error: err.message });
//     } finally {
//       setSubmitStatus({ loading: false, error: null });
//     }
//   };

//   const getLocalizedContent = (item, field) => {
//     const lang = i18n.language;
//     return item[`${field}_${lang}`] || item[field];
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex items-center space-x-2">
//           <Loader className="w-6 h-6 text-blue-500 animate-spin" />
//           <span className="text-gray-600">Chargement...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <PasswordProtection>
//       <div className="min-h-screen bg-gray-50 px-4 py-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
//               <div className="flex items-center">
//                 <Globe className="w-8 h-8 text-blue-500 mr-3" />
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   Gestion des {selectedType === 'options' ? 'Options' : 'Installations'}
//                 </h1>
//               </div>
//               <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
//               <select
//                   value={selectedType}
//                   onChange={(e) => setSelectedType(e.target.value)}
//                   className="p-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="options">Options</option>
//                   <option value="installations">Installations</option>
//                 </select>
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('isAuthenticated');
//                     window.location.reload();
//                   }}
//                   className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Se déconnecter
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <ItemForm
//             onSubmit={handleFormSubmit}
//             initialData={editingId ? items.find(item => item.id === editingId) : {}}
//             onCancel={() => setEditingId(null)}
//             isSubmitting={submitStatus.loading}
//           />

//           {/* Items Grid */}
//           <div className="grid grid-cols-1 gap-6">
//             {items.map(item => (
//               <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                 <div className="flex flex-col md:flex-row">
//                   {/* Image Section */}
//                   <div className="w-full md:w-1/4 bg-gray-50 p-6 flex items-center justify-center">
//                     {item.image ? (
//                       <img 
//                         src={item.image} 
//                         alt={getLocalizedContent(item, 'title')}
//                         className="h-48 w-full object-cover object-left md:h-64  rounded-xl shadow-md" 
//                       />
//                     ) : (
//                       <div className="w-full h-48 md:h-64 bg-gray-100 rounded-xl flex items-center justify-center">
//                         <ImageIcon className="w-16 h-16 text-gray-400" />
//                       </div>
//                     )}
//                   </div>

//                   {/* Content Section */}
//                   <div className="w-full md:w-3/4 p-6 flex flex-col">
//                     {/* Language Tabs */}
//                     <div className="flex space-x-2 mb-6">
//                       {['FR', 'EN', 'ES'].map((lang) => (
//                         <div 
//                           key={lang}
//                           className={`px-4 py-2 text-sm font-medium rounded-lg ${
//                             lang === 'FR' 
//                               ? 'bg-blue-100 text-blue-600'
//                               : lang === 'EN'
//                                 ? 'bg-green-100 text-green-600'
//                                 : 'bg-yellow-100 text-yellow-600'
//                           }`}
//                         >
//                           {lang}
//                         </div>
//                       ))}
//                     </div>

//                     {/* Content for each language */}
//                     <div className="grid grid-cols-3 gap-4">
//                       {/* French Content */}
//                       <div>
//                         <h3 className="text-lg font-semibold text-blue-600 mb-2">Français</h3>
//                         <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
//                         <p className="text-gray-600">{item.description}</p>
//                       </div>

//                       {/* English Content */}
//                       <div>
//                         <h3 className="text-lg font-semibold text-green-600 mb-2">English</h3>
//                         <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title_en}</h4>
//                         <p className="text-gray-600">{item.description_en}</p>
//                       </div>

//                       {/* Spanish Content */}
//                       <div>
//                         <h3 className="text-lg font-semibold text-yellow-600 mb-2">Español</h3>
//                         <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title_es}</h4>
//                         <p className="text-gray-600">{item.description_es}</p>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
//                       <div className="flex space-x-3">
//                         <button
//                           onClick={() => setEditingId(item.id)}
//                           className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
//                         >
//                           <Edit2 className="w-4 h-4 mr-2" />
//                           Modifier
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
//                         >
//                           <Trash2 className="w-4 h-4 mr-2" />
//                           Supprimer
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {items.length === 0 && !loading && (
//             <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//               <div className="flex justify-center mb-4">
//                 <ImageIcon className="w-16 h-16 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-800 mb-2">
//                 Aucun {selectedType === 'options' ? 'option' : 'installation'} disponible
//               </h3>
//               <p className="text-gray-600">
//                 Commencez par ajouter un nouvel élément en utilisant le formulaire ci-dessus.
//               </p>
//             </div>
//           )}

//           {/* Error Toast */}
//           {error && (
//             <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-4">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <X className="h-5 w-5 text-red-500" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-600">{error}</p>
//                 </div>
//                 <div className="ml-auto pl-3">
//                   <button
//                     onClick={() => setError(null)}
//                     className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Loading Overlay */}
//           {submitStatus.loading && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//               <div className="bg-white rounded-2xl shadow-xl p-6">
//                 <div className="flex items-center space-x-3">
//                   <Loader className="w-6 h-6 text-blue-500 animate-spin" />
//                   <p className="text-gray-700">Traitement en cours...</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </PasswordProtection>
//   );
// }

// PasswordProtection.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// ItemForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   initialData: PropTypes.object,
//   onCancel: PropTypes.func.isRequired,
//   isSubmitting: PropTypes.bool,
// };

// export { ModernOptionsInstallationsComponent as default, PasswordProtection };




///////////////////////////

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { 
  PlusCircle, 
  X, 
  Edit2, 
  Trash2, 
  Lock, 
  LogOut, 
  Image as ImageIcon, 
  Globe, 
  Loader, 
  ChevronDown, 
  Menu, 
  Grid, 
  Box, 
  Settings 
} from 'lucide-react';

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
        </div>
      </div>
    );
  }

  return children;
}

// Sidebar Component
const Sidebar = ({ selectedType, setSelectedType, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-20 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setSelectedType('options')}
              className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                selectedType === 'options' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <Grid className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Options</span>}
            </button>
            <button
              onClick={() => setSelectedType('installations')}
              className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                selectedType === 'installations' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <Box className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Installations</span>}
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Se déconnecter</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

// Item Form Component
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

  useEffect(() => {
    if (initialData.id) {
      reset(initialData);
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <PlusCircle className="w-6 h-6 mr-2 text-blue-500" />
          {initialData.id ? 'Modifier l\'élément' : 'Ajouter un nouvel élément'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className="p-8 space-y-8">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <ImageIcon className="w-6 h-6 mr-2 text-gray-500" />
            <label className="text-lg font-medium text-gray-700">URL de l'image</label>
          </div>
          <input
            {...register('image')}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Sections for each language */}
        {/* French */}
        <div className="bg-white p-6 rounded-xl border-2 border-blue-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold text-lg">FR</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Français</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title', { required: true })}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Description en français"
              />
            </div>
          </div>
        </div>

        {/* English */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold text-lg">EN</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">English</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Title
              </label>
              <input
                {...register('title_en')}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Description in English"
              />
            </div>
          </div>
        </div>

        {/* Spanish */}
        <div className="bg-white p-6 rounded-xl border-2 border-yellow-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <span className="text-yellow-600 font-bold text-lg">ES</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Español</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Título
              </label>
              <input
                {...register('title_es')}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="Descripción en español"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-2" />
              {initialData.id ? 'Mettre à jour' : 'Ajouter'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

// Item Card Component
const ItemCard = ({ item, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-left object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className='grid grid-cols-3 gap-8'>
            <h3 className="text-xl font-bold text-blue-600">{item.title}</h3>
            <h3 className="text-xl font-bold text-green-600">{item.title_en}</h3>
            <h3 className="text-xl font-bold text-yellow-600">{item.title_es}</h3>
          </div>
            <div className="flex space-x-2 mt-2">
              {['FR', 'EN', 'ES'].map((lang) => (
                <span 
                  key={lang}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    lang === 'FR' 
                      ? 'bg-blue-100 text-blue-600'
                      : lang === 'EN'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 ${expanded ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">Français</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-600 mb-2">English</h4>
              <p className="text-gray-600">{item.description_en}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-yellow-600 mb-2">Español</h4>
              <p className="text-gray-600">{item.description_es}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'transform rotate-180' : ''}`} />
            <span className="ml-2">{expanded ? 'Moins de détails' : 'Plus de détails'}</span>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item.id)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Modifier"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
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
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-gray-50">
        <Sidebar 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onLogout={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.reload();
          }}
        />

        <main className="ml-20 lg:ml-64 min-h-screen">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedType === 'options' ? 'Options' : 'Installations'}
              </h1>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Ajouter
              </button>
            </div>

            {/* Form Modal */}
            {(showForm || editingId) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <ItemForm
                    onSubmit={handleFormSubmit}
                    initialData={editingId ? items.find(item => item.id === editingId) : {}}
                    onCancel={() => {
                      setEditingId(null);
                      setShowForm(false);
                    }}
                    isSubmitting={submitStatus.loading}
                  />
                </div>
              </div>
            )}

            {/* Items Grid */}
            <div className="grid grid-cols-1 gap-6">
              {items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={setEditingId}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Empty State */}
            {items.length === 0 && !loading && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Aucun {selectedType === 'options' ? 'option' : 'installation'} disponible
                </h3>
                <p className="text-gray-600 mb-6">
                  Commencez par ajouter un nouvel élément.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Ajouter
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Error Toast */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-4 z-50">
            <div className="flex items-center">
              <X className="h-5 w-5 text-red-500" />
              <p className="ml-3 text-sm text-red-600">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-4 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {submitStatus.loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3">
                <Loader className="w-6 h-6 text-blue-500 animate-spin" />
                <p className="text-gray-700">Traitement en cours...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PasswordProtection>
  );
}

// PropTypes
PasswordProtection.propTypes = {
  children: PropTypes.node.isRequired,
};

ItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

Sidebar.propTypes = {
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ModernOptionsInstallationsComponent as default, PasswordProtection };