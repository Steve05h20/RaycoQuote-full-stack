import tpms from '../option/TPMS.png';
import maxiLoad from '../option/66GBALANCEK2 11UZP0018 33V9009.png';
import installation from '../option/55INSTALLATION.png';

export const staticOptionsData = [
    {
        id: 1,
        title: 'options.tpms.title',
        description: 'options.tpms.description',
        image: tpms
    },
    {
        id: 2,
        title: 'options.maxiload.title',
        description: 'options.maxiload.description',
        image: maxiLoad
    },
];

export const staticInstallationOptions = [
    {
        id: 1,
        title: 'installation.option.title',
        description: 'installation.option.description',
        image: installation
    },
];

const fetchDataFromApi = async (endpoint) => {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error(`Erreur lors de la récupération des données de ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Erreur de récupération des données de ${endpoint}:`, error);
        return [];
    }
};

const mergeData = (staticData, apiData) => {
    const mergedData = [...staticData];
    apiData.forEach(apiItem => {
        const existingIndex = mergedData.findIndex(item => item.id === apiItem.id);
        if (existingIndex === -1) {
            mergedData.push(apiItem);
        } else {
            mergedData[existingIndex] = { ...mergedData[existingIndex], ...apiItem };
        }
    });
    return mergedData;
};

export const getOptionsData = async () => {
    const apiOptionsData = await fetchDataFromApi('options');
    return mergeData(staticOptionsData, apiOptionsData);
};

export const getInstallationOptions = async () => {
    const apiInstallationData = await fetchDataFromApi('installations');
    return mergeData(staticInstallationOptions, apiInstallationData);
};

export const additionalOfferOptions = staticOptionsData;