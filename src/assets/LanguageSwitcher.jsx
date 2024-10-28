import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PriceCalculatorWidget from '../components/PriceCalculatorDialog';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex space-x-2">
            <button
                className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`px-2 py-1 rounded ${i18n.language === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('fr')}
            >
                FR
            </button>
            <button
                className={`px-2 py-1 rounded ${i18n.language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('es')}
            >
                ES
            </button>
            <Link className='px-2 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white' to={"/admin"}>admin</Link>
            <Link className='px-2 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white' to={"/admin2"}>admin2</Link>

            <PriceCalculatorWidget/>
        </div>
    );
};

export default LanguageSwitcher;