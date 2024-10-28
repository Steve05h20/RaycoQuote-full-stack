import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { X, ChevronDown, ChevronUp } from "lucide-react";

const RaycoQuote2 = () => {
    const { t, i18n } = useTranslation();
    const [options, setOptions] = useState([]);
    const [installations, setInstallations] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedInstallationOption, setSelectedInstallationOption] = useState(null);
    const [selectedAdditionalOption, setSelectedAdditionalOption] = useState(null);
    const [installationDetails, setInstallationDetails] = useState("");
    const [additionalOfferDetails, setAdditionalOfferDetails] = useState("");
    const [otherOptions, setOtherOptions] = useState("");
    const [notes, setNotes] = useState("");
    const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);
    const [isInstallationDropdownOpen, setIsInstallationDropdownOpen] = useState(false);
    const [isAdditionalOfferDropdownOpen, setIsAdditionalOfferDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [optionsRes, installationsRes] = await Promise.all([
                    fetch('/api/items?type=options'),
                    fetch('/api/items?type=installations')
                ]);

                const optionsData = await optionsRes.json();
                const installationsData = await installationsRes.json();

                setOptions(optionsData);
                setInstallations(installationsData);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            }
        };

        fetchData();
    }, []);

    const getLocalizedContent = (item, field) => {
        const lang = i18n.language;
        return item[`${field}_${lang}`] || item[field];
    };

    const handleOptionSelect = (option) => {
        if (selectedOptions.length < 3 && !selectedOptions.includes(option.id)) {
            setSelectedOptions([...selectedOptions, option.id]);
        }
        setIsOptionDropdownOpen(false);
    };

    const handleInstallationSelect = (option) => {
        setSelectedInstallationOption(option);
        setIsInstallationDropdownOpen(false);
    };

    const handleAdditionalOfferSelect = (option) => {
        setSelectedAdditionalOption(option);
        setIsAdditionalOfferDropdownOpen(false);
    };

    const removeOption = (optionId) => {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    };

    const OptionCard = ({ option, onRemove }) => (
        <div className="border p-2 flex items-start relative text-[10pt]">
            {option.image && (
                <img 
                    src={option.image} 
                    alt={getLocalizedContent(option, 'title')} 
                    className="w-16 object-cover object-left h-16 mr-2" 
                />
            )}
            <div>
                <h3 className="font-bold text-[11pt]">{getLocalizedContent(option, 'title')}</h3>
                <p>{getLocalizedContent(option, 'description')}</p>
            </div>
            {onRemove && (
                <button onClick={onRemove} className="absolute top-1 right-1 text-red-600">
                    <X size={16} />
                </button>
            )}
        </div>
    );

    const Dropdown = ({ isOpen, toggle, options, onSelect, placeholder }) => (
        <div className="relative">
            <button
                onClick={toggle}
                className="w-full p-2 border flex justify-between items-center text-[10pt]"
            >
                {placeholder}
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full bg-white border mt-1">
                    {options.map(option => (
                        <div
                            key={option.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => onSelect(option)}
                        >
                            {option.image && (
                                <img 
                                    src={option.image} 
                                    alt={getLocalizedContent(option, 'title')} 
                                    className="w-12 object-cover object-left h-12 mr-2" 
                                />
                            )}
                            {getLocalizedContent(option, 'title')}
                        </div>
                    ))}
                </div>
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
                    const option = options.find(o => o.id === optionId);
                    return option && (
                        <OptionCard
                            key={option.id}
                            option={option}
                            onRemove={() => removeOption(option.id)}
                        />
                    );
                })}
                {selectedOptions.length < 3 && (
                    <div className="border p-2">
                        <Dropdown
                            isOpen={isOptionDropdownOpen}
                            toggle={() => setIsOptionDropdownOpen(!isOptionDropdownOpen)}
                            options={options}
                            onSelect={handleOptionSelect}
                            placeholder={t('options.selectOption')}
                        />
                    </div>
                )}
                <div className="border p-2 col-span-2">
                    <textarea
                        className="w-full p-1 border text-[10pt]"
                        rows="2"
                        placeholder={t('options.otherOptions')}
                        value={otherOptions}
                        onChange={(e) => setOtherOptions(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {/* Section d'installation */}
            <h2 className="text-red-600 font-bold text-lg mb-3">{t('installation.title')}</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <Dropdown
                        isOpen={isInstallationDropdownOpen}
                        toggle={() => setIsInstallationDropdownOpen(!isInstallationDropdownOpen)}
                        options={installations}
                        onSelect={handleInstallationSelect}
                        placeholder={t('installation.selectInstallation')}
                    />
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
                    <Dropdown
                        isOpen={isAdditionalOfferDropdownOpen}
                        toggle={() => setIsAdditionalOfferDropdownOpen(!isAdditionalOfferDropdownOpen)}
                        options={options}
                        onSelect={handleAdditionalOfferSelect}
                        placeholder={t('additionalOffer.selectOffer')}
                    />
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            ></textarea>

            {/* Pied de page */}
            <div className="bg-red-600 h-3 absolute bottom-0 left-0 right-0"></div>
        </div>
    );
};

export default RaycoQuote2;