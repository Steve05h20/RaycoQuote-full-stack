import tpms from '../option/TPMS.png';
import installation from '../option/55INSTALLATION.png';

const staticOptionsData = [
    {
        id: 1,
        title: 'options.tpms.title',
        description: 'options.tpms.description',
        image: tpms
    },
];

const staticInstallationOptions = [
    {
        id: 1,
        title: 'installation.option.title',
        description: 'installation.option.description',
        image: installation
    },
];

function fetchDataFromApiSync(endpoint) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/${endpoint}`, false);  // false makes the request synchronous
    xhr.send(null);

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        console.error(`Erreur de récupération des données de ${endpoint}: ${xhr.status}`);
        return [];
    }
}

function mergeData(staticData, apiData) {
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
}

// Récupération et fusion synchrone des données
const apiOptionsData = fetchDataFromApiSync('options');
const apiInstallationData = fetchDataFromApiSync('installations');

export const optionsData = mergeData(staticOptionsData, apiOptionsData);
export const installationOptions = mergeData(staticInstallationOptions, apiInstallationData);

export const additionalOfferOptions = optionsData;