import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { X } from "lucide-react";

import tpms from '../option/TPMS.png'
import maxiLoad from '../option/66GBALANCEK2 11UZP0018 33V9009.png'
import installation from '../option/55INSTALLATION.png'
 
const RaycoQuote2 = () => {
    const { t } = useTranslation();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedInstallationOption, setSelectedInstallationOption] = useState(null);
    const [selectedAdditionalOption, setSelectedAdditionalOption] = useState(null);
    const [installationDetails, setInstallationDetails] = useState("");
    const [additionalOfferDetails, setAdditionalOfferDetails] = useState("");

    // Définition des options avec internationalisation
    const optionsData = [
        {
            id: 1,
            title: t('options.tpms.title'),
            description: t('options.tpms.description'),
            image: tpms
        },
        {
            id: 2,
            title: t('options.maxiload.title'),
            description: t('options.maxiload.description'),
            image: maxiLoad
        },
    ];

    const installationOptions = [
        {
            id: 1,
            title: t('installation.option.title'),
            description: t('installation.option.description'),
            image: installation
        },
    ];

    const additionalOfferOptions = [...optionsData];

    const handleOptionSelect = (e) => {
        const selectedId = parseInt(e.target.value);
        if (selectedOptions.length < 3 && !selectedOptions.includes(selectedId)) {
            setSelectedOptions([...selectedOptions, selectedId]);
        }
    };

    const removeOption = (optionId) => {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    };

    const OptionCard = ({ option, onRemove }) => (
        <div className="border p-2 flex items-start relative text-[10pt]">
            <img src={option.image} alt={option.title} className="w-16 object-cover object-left h-16 mr-2" />
            <div>
                <h3 className="font-bold text-[11pt]">{option.title}</h3>
                <p>{option.description}</p>
            </div>
            {onRemove && (
                <button onClick={onRemove} className="absolute top-1 right-1 text-red-600">
                    <X size={16} />
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-white w-[215.9mm] min-h-[279.4mm] mx-auto shadow-lg relative p-3 text-[10pt] leading-tight">
            <div className="absolute top-3 right-3 text-[8pt]">{t('form.page', { page: 2 })}</div>

            {/* Section des options */}
            <h2 className="text-red-600 font-bold text-lg mb-3">{t('options.title')}</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
                {selectedOptions.map((optionId) => {
                    const option = optionsData.find(o => o.id === optionId);
                    return (
                        <OptionCard
                            key={option.id}
                            option={option}
                            onRemove={() => removeOption(option.id)}
                        />
                    );
                })}
                {selectedOptions.length < 3 && (
                    <div className="border p-2">
                        <select onChange={handleOptionSelect} className="w-full p-1 border text-[10pt]">
                            <option value="">{t('options.selectOption')}</option>
                            {optionsData.map((option) => (
                                <option key={option.id} value={option.id}>{option.title}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="border p-2 col-span-2">
                    <textarea
                        className="w-full p-1 border text-[10pt]"
                        rows="2"
                        placeholder={t('options.otherOptions')}
                    ></textarea>
                </div>
            </div>

            {/* Section d'installation */}
            <h2 className="text-red-600 font-bold text-lg mb-3">{t('installation.title')}</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <select
                        value={selectedInstallationOption ? selectedInstallationOption.id : ""}
                        onChange={(e) => setSelectedInstallationOption(installationOptions.find(o => o.id === parseInt(e.target.value)))}
                        className="w-full p-1 border mb-2 text-[10pt]"
                    >
                        <option value="">{t('installation.selectInstallation')}</option>
                        {installationOptions.map((option) => (
                            <option key={option.id} value={option.id}>{option.title}</option>
                        ))}
                    </select>
                    {selectedInstallationOption && (
                        <OptionCard
                            option={selectedInstallationOption}
                            onRemove={() => setSelectedInstallationOption(null)}
                        />
                    )}
                </div>
                <div>
                    <textarea
                        className="w-full h-full p-1 border text-[10pt]"
                        placeholder={t('installation.additionalDetails')}
                        value={installationDetails}
                        onChange={(e) => setInstallationDetails(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {/* Section d'offre supplémentaire */}
            <h2 className="text-red-600 font-bold text-lg mb-3">{t('additionalOffer.title')}</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <select
                        value={selectedAdditionalOption ? selectedAdditionalOption.id : ""}
                        onChange={(e) => setSelectedAdditionalOption(additionalOfferOptions.find(o => o.id === parseInt(e.target.value)))}
                        className="w-full p-1 border mb-2 text-[10pt]"
                    >
                        <option value="">{t('additionalOffer.selectOffer')}</option>
                        {additionalOfferOptions.map((option) => (
                            <option key={option.id} value={option.id}>{option.title}</option>
                        ))}
                    </select>
                    {selectedAdditionalOption && (
                        <OptionCard
                            option={selectedAdditionalOption}
                            onRemove={() => setSelectedAdditionalOption(null)}
                        />
                    )}
                </div>
                <div>
                    <textarea
                        className="w-full h-full p-1 border text-[10pt]"
                        placeholder={t('additionalOffer.additionalDetails')}
                        value={additionalOfferDetails}
                        onChange={(e) => setAdditionalOfferDetails(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {/* Section des conditions d'expédition */}
            <h2 className="text-red-600 font-bold text-lg mb-3">{t('shippingTerms.title')}</h2>
            <p className="mb-3 text-[9pt]">
                {t('shippingTerms.description')}
            </p>

            {/* Section des notes */}
            <h2 className="text-red-600 font-bold text-lg mb-3">{t('notes.title')}</h2>
            <textarea
                className="w-full p-1 border text-[10pt]"
                rows="3"
                placeholder={t('notes.placeholder')}
            ></textarea>

            {/* Pied de page */}
            <div className="bg-red-600 h-3 absolute bottom-0 left-0 right-0"></div>
        </div>
    );
};

export default RaycoQuote2;