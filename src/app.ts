import { generateCharacter } from './generator';
import { Character, assetOptions, Asset, Bond, Vow, vowRanks } from './types';
import DiceRoller from './diceRoller';

// DOM elements
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const characterNameEl = document.getElementById('character-name') as HTMLInputElement;
const edgeEl = document.getElementById('edge') as HTMLInputElement;
const heartEl = document.getElementById('heart') as HTMLInputElement;
const ironEl = document.getElementById('iron') as HTMLInputElement;
const shadowEl = document.getElementById('shadow') as HTMLInputElement;
const witsEl = document.getElementById('wits') as HTMLInputElement;
const backgroundEl = document.getElementById('background') as HTMLTextAreaElement;
const assetsListEl = document.getElementById('assets-list') as HTMLUListElement;
const manageAssetsBtn = document.getElementById('manage-assets-btn') as HTMLButtonElement;
const rollDiceBtn = document.getElementById('roll-dice-btn') as HTMLButtonElement;
const diceContainerEl = document.getElementById('dice-container') as HTMLDivElement;
const diceResultsEl = document.getElementById('dice-results') as HTMLDivElement;

// Condition elements
const healthTrackEl = document.getElementById('health') as HTMLDivElement;
const spiritTrackEl = document.getElementById('spirit') as HTMLDivElement;
const supplyTrackEl = document.getElementById('supply') as HTMLDivElement;
const momentumTrackEl = document.getElementById('momentum') as HTMLDivElement;

// Progress track elements
const bondsContainerEl = document.getElementById('bonds-container') as HTMLDivElement;
const vowsContainerEl = document.getElementById('vows-container') as HTMLDivElement;
const addBondBtn = document.getElementById('add-bond-btn') as HTMLButtonElement;
const addVowBtn = document.getElementById('add-vow-btn') as HTMLButtonElement;

// Asset Modal elements
const assetModal = document.getElementById('asset-modal') as HTMLDivElement;
const closeAssetModal = assetModal.querySelector('.close-modal') as HTMLSpanElement;
const availableAssetsList = document.getElementById('available-assets-list') as HTMLUListElement;
const selectedAssetsList = document.getElementById('selected-assets-list') as HTMLUListElement;
const saveAssetsBtn = document.getElementById('save-assets-btn') as HTMLButtonElement;

// Bond Modal elements
const bondModal = document.getElementById('bond-modal') as HTMLDivElement;
const closeBondModal = bondModal.querySelector('.close-modal') as HTMLSpanElement;
const bondNameEl = document.getElementById('bond-name') as HTMLInputElement;
const bondProgressEl = document.getElementById('bond-progress') as HTMLDivElement;
const saveBondBtn = document.getElementById('save-bond-btn') as HTMLButtonElement;

// Vow Modal elements
const vowModal = document.getElementById('vow-modal') as HTMLDivElement;
const closeVowModal = vowModal.querySelector('.close-modal') as HTMLSpanElement;
const vowDescriptionEl = document.getElementById('vow-description') as HTMLTextAreaElement;
const vowRankEl = document.getElementById('vow-rank') as HTMLSelectElement;
const vowProgressEl = document.getElementById('vow-progress') as HTMLDivElement;
const saveVowBtn = document.getElementById('save-vow-btn') as HTMLButtonElement;

// Current character state
let currentCharacter: Character | null = null;
let diceRoller: DiceRoller | null = null;

// Initialize dice roller
function initDiceRoller() {
    if (diceRoller) {
        diceRoller.dispose();
    }
    diceRoller = new DiceRoller(diceContainerEl);
}

// Create condition track
function createConditionTrack(container: HTMLElement, value: number, max: number = 5) {
    container.innerHTML = '';
    for (let i = 0; i < max; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = i < value;
        checkbox.addEventListener('change', () => {
            if (currentCharacter) {
                const trackName = container.id as keyof typeof currentCharacter.condition;
                currentCharacter.condition[trackName] = container.querySelectorAll('input:checked').length;
            }
        });
        container.appendChild(checkbox);
    }
}

// Create progress track
function createProgressTrack(container: HTMLElement, value: number = 0) {
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = i < value;
        container.appendChild(checkbox);
    }
}

// Update character display
function updateCharacterDisplay(character: Character) {
    characterNameEl.value = character.name;
    edgeEl.value = character.stats.edge.toString();
    heartEl.value = character.stats.heart.toString();
    ironEl.value = character.stats.iron.toString();
    shadowEl.value = character.stats.shadow.toString();
    witsEl.value = character.stats.wits.toString();
    backgroundEl.value = character.background;

    // Update condition tracks
    createConditionTrack(healthTrackEl, character.condition.health);
    createConditionTrack(spiritTrackEl, character.condition.spirit);
    createConditionTrack(supplyTrackEl, character.condition.supply);
    createConditionTrack(momentumTrackEl, character.condition.momentum, 10);

    // Update assets
    updateAssetsList(character.assets);

    // Update bonds
    updateBondsList(character.bonds);

    // Update vows
    updateVowsList(character.vows);
}

// Update assets list
function updateAssetsList(assets: Asset[]) {
    assetsListEl.innerHTML = '';
    assets.forEach(asset => {
        const li = document.createElement('li');
        li.className = 'asset-card';
        li.innerHTML = `
            <div class="asset-header">${asset.name}</div>
            <div class="asset-description">${asset.description}</div>
            <div class="asset-abilities">
                ${asset.abilities.map((ability, index) => `
                    <div class="ability-container">
                        <input type="checkbox" id="${asset.name}-ability-${index}" 
                            ${asset.checked[index] ? 'checked' : ''}>
                        <label for="${asset.name}-ability-${index}">${ability}</label>
                    </div>
                `).join('')}
            </div>
        `;
        assetsListEl.appendChild(li);
    });
}

// Update bonds list
function updateBondsList(bonds: Bond[]) {
    bondsContainerEl.innerHTML = '';
    bonds.forEach(bond => {
        const bondElement = document.createElement('div');
        bondElement.className = 'bond-item ds-u-padding--2';
        bondElement.innerHTML = `
            <h4 class="ds-h4">${bond.name}</h4>
            <div class="progress-track">
                ${createProgressTrackHTML(bond.progress)}
            </div>
        `;
        bondsContainerEl.appendChild(bondElement);
    });
}

// Update vows list
function updateVowsList(vows: Vow[]) {
    vowsContainerEl.innerHTML = '';
    vows.forEach(vow => {
        const vowElement = document.createElement('div');
        vowElement.className = 'vow-item ds-u-padding--2';
        vowElement.innerHTML = `
            <h4 class="ds-h4">${vow.description}</h4>
            <p>Rank: ${vow.rank}</p>
            <div class="progress-track">
                ${createProgressTrackHTML(vow.progress)}
            </div>
        `;
        vowsContainerEl.appendChild(vowElement);
    });
}

// Helper function to create progress track HTML
function createProgressTrackHTML(value: number): string {
    return Array(10).fill(0).map((_, i) => 
        `<input type="checkbox" ${i < value ? 'checked' : ''}>`)
        .join('');
}

// Modal management
function openModal(modal: HTMLElement) {
    modal.style.display = 'block';
}

function closeModal(modal: HTMLElement) {
    modal.style.display = 'none';
}

// Asset modal management
function populateAssetModal() {
    if (!currentCharacter) return;

    availableAssetsList.innerHTML = '';
    selectedAssetsList.innerHTML = '';

    const selectedAssetNames = new Set(currentCharacter.assets.map(a => a.name));

    assetOptions.forEach(asset => {
        const li = document.createElement('li');
        li.className = 'asset-card selectable';
        li.innerHTML = `
            <div class="asset-header">${asset.name}</div>
            <div class="asset-description">${asset.description}</div>
            <div class="asset-abilities">
                ${asset.abilities.map(ability => `
                    <div class="ability-container">
                        <label>${ability}</label>
                    </div>
                `).join('')}
            </div>
        `;

        if (selectedAssetNames.has(asset.name)) {
            li.classList.add('selected');
            const selectedLi = li.cloneNode(true) as HTMLElement;
            selectedLi.addEventListener('click', () => {
                selectedAssetNames.delete(asset.name);
                selectedLi.remove();
                li.classList.remove('selected');
            });
            selectedAssetsList.appendChild(selectedLi);
        } else {
            li.addEventListener('click', () => {
                if (selectedAssetNames.has(asset.name)) {
                    selectedAssetNames.delete(asset.name);
                    li.classList.remove('selected');
                    // Remove from selected list
                    const selectedItem = Array.from(selectedAssetsList.children)
                        .find(el => el.querySelector('.asset-header')?.textContent === asset.name);
                    if (selectedItem) {
                        selectedItem.remove();
                    }
                } else {
                    selectedAssetNames.add(asset.name);
                    li.classList.add('selected');
                    // Add to selected list
                    const selectedLi = li.cloneNode(true) as HTMLElement;
                    selectedLi.addEventListener('click', () => {
                        selectedAssetNames.delete(asset.name);
                        selectedLi.remove();
                        li.classList.remove('selected');
                    });
                    selectedAssetsList.appendChild(selectedLi);
                }
            });
            availableAssetsList.appendChild(li);
        }
    });
}

// Event Listeners
generateBtn.addEventListener('click', () => {
    currentCharacter = generateCharacter();
    updateCharacterDisplay(currentCharacter);
});

rollDiceBtn.addEventListener('click', async () => {
    if (!diceRoller) {
        initDiceRoller();
    }
    const results = await diceRoller?.rollDice();
    if (results) {
        diceResultsEl.textContent = `Results: ${results.join(', ')}`;
    }
});

manageAssetsBtn.addEventListener('click', () => {
    populateAssetModal();
    openModal(assetModal);
});

closeAssetModal.addEventListener('click', () => closeModal(assetModal));

saveAssetsBtn.addEventListener('click', () => {
    if (!currentCharacter) return;
    
    const selectedAssets = Array.from(selectedAssetsList.children).map(li => {
        const assetName = li.querySelector('.asset-header')?.textContent || '';
        const asset = assetOptions.find(a => a.name === assetName);
        if (asset) {
            // Create a new asset object with default checked states
            return {
                ...asset,
                checked: new Array(asset.abilities.length).fill(false)
            };
        }
        return null;
    }).filter((asset): asset is Asset => asset !== null);

    currentCharacter.assets = selectedAssets;
    updateAssetsList(selectedAssets);
    closeModal(assetModal);
});

addBondBtn.addEventListener('click', () => {
    createProgressTrack(bondProgressEl);
    openModal(bondModal);
});

closeBondModal.addEventListener('click', () => closeModal(bondModal));

saveBondBtn.addEventListener('click', () => {
    if (!currentCharacter) return;

    const newBond: Bond = {
        name: bondNameEl.value,
        progress: Array.from(bondProgressEl.querySelectorAll('input:checked')).length
    };

    currentCharacter.bonds.push(newBond);
    updateBondsList(currentCharacter.bonds);
    closeModal(bondModal);
    bondNameEl.value = '';
});

addVowBtn.addEventListener('click', () => {
    createProgressTrack(vowProgressEl);
    openModal(vowModal);
});

closeVowModal.addEventListener('click', () => closeModal(vowModal));

saveVowBtn.addEventListener('click', () => {
    if (!currentCharacter) return;

    const newVow: Vow = {
        description: vowDescriptionEl.value,
        rank: vowRankEl.value,
        progress: Array.from(vowProgressEl.querySelectorAll('input:checked')).length
    };

    currentCharacter.vows.push(newVow);
    updateVowsList(currentCharacter.vows);
    closeModal(vowModal);
    vowDescriptionEl.value = '';
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initDiceRoller();
    // Create empty condition tracks
    createConditionTrack(healthTrackEl, 5);
    createConditionTrack(spiritTrackEl, 5);
    createConditionTrack(supplyTrackEl, 5);
    createConditionTrack(momentumTrackEl, 2, 10);
});