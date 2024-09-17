import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import LanguageSwitcher from './LanguageSwitcher';
import RaycoQuote1 from './RaycoQuote1';
import RaycoQuote2 from './RaycoQuote2';
import RaycoQuote3 from './RaycoQuote3';
import RaycoQuote4 from './RaycoQuote4';

const CombinedRaycoQuote = () => {
    const { t } = useTranslation();
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'rayco_quote',
        onBeforeGetContent: () => {
            // You can update component state here if needed
            return new Promise((resolve) => {
                resolve();
            });
        },
        onAfterPrint: () => {
            // You can perform actions after printing here
        },
    });

    return (
        <div className="relative">
            <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
                <LanguageSwitcher />
            </div>

            <div ref={componentRef} className="max-w-[215.9mm] mx-auto">
                <div className="rayco-quote-page">
                    <RaycoQuote1 />
                </div>
                <div className="rayco-quote-page">
                    <RaycoQuote2 />
                </div>
                <div className="rayco-quote-page">
                    <RaycoQuote3 />
                </div>
                <div className="rayco-quote-page">
                    <RaycoQuote4 />
                </div>
            </div>

            <button
                onClick={handlePrint}
                className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
                {t('exportToPDF')}
            </button>
        </div>
    );
};

export default CombinedRaycoQuote;