import { generateCharacter } from './generator';
import { Character, assetOptions, Asset, Bond, Vow, vowRanks } from './types';

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

// Current character data
let currentAssets: Asset[] = [];
let currentBonds: Bond[] = [];
let currentVows: Vow[] = [];
let editingBondIndex: number | null = null;
let editingVowIndex: number | null = null;

// Initialize checkbox tracks
function initializeCheckboxTracks() {
    // Create health track (0-5)
    createCheckboxTrack(healthTrackEl, 5, 'health');
    
    // Create spirit track (0-5)
    createCheckboxTrack(spiritTrackEl, 5, 'spirit');
    
    // Create supply track (0-5)
    createCheckboxTrack(supplyTrackEl, 5, 'supply');
    
    // Create momentum track (-6 to +10)
    createMomentumTrack(momentumTrackEl);
    
    // Create bond progress track (0-10)
    createCheckboxTrack(bondProgressEl, 10, 'bond-progress');
    
    // Create vow progress track (0-10)
    createCheckboxTrack(vowProgressEl, 10, 'vow-progress');
}

// Function to create a checkbox track
function createCheckboxTrack(container: HTMLElement, count: number, name: string) {
    container.innerHTML = '';
    
    // Add value display
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'meter-value-display';
    valueDisplay.id = `${name}-value`;
    valueDisplay.textContent = '0';
    
    const trackContainer = document.createElement('div');
    trackContainer.className = 'checkbox-track';
    
    for (let i = 0; i < count; i++) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-track-container';
        
        const label = document.createElement('label');
        label.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = name;
        checkbox.value = (i + 1).toString();
        checkbox.dataset.index = i.toString();
        
        // Add event listener to handle clicking on checkboxes
        checkboxContainer.addEventListener('click', (e) => {
            // Prevent default to avoid double-triggering
            e.preventDefault();
            
            // Get the current state and toggle it
            const isChecked = checkbox.checked;
            
            // If unchecking, update to the previous value
            if (isChecked) {
                updateCheckboxTrack(trackContainer, i - 1);
                valueDisplay.textContent = i.toString();
            } 
            // If checking, update to this value
            else {
                updateCheckboxTrack(trackContainer, i);
                valueDisplay.textContent = (i + 1).toString();
            }
        });
        
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'checkbox-value';
        valueLabel.textContent = (i + 1).toString();
        
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(valueLabel);
        trackContainer.appendChild(checkboxContainer);
    }
    
    container.appendChild(trackContainer);
    container.appendChild(valueDisplay);
}

// Function to create momentum track (-6 to +10)
function createMomentumTrack(container: HTMLElement) {
    container.innerHTML = '';
    
    // Add value display
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'meter-value-display';
    valueDisplay.id = 'momentum-value';
    valueDisplay.textContent = '0';
    
    const trackContainer = document.createElement('div');
    trackContainer.className = 'checkbox-track momentum-track';
    
    // Create negative momentum (-6 to -1)
    for (let i = 6; i >= 1; i--) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-track-container';
        
        const label = document.createElement('label');
        label.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'momentum';
        checkbox.value = (-i).toString();
        checkbox.dataset.index = (-i).toString();
        
        // Add event listener
        checkboxContainer.addEventListener('click', (e) => {
            e.preventDefault();
            updateMomentumTrack(-i);
            valueDisplay.textContent = (-i).toString();
        });
        
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'checkbox-value';
        valueLabel.textContent = (-i).toString();
        
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(valueLabel);
        trackContainer.appendChild(checkboxContainer);
    }
    
    // Create positive momentum (0 to +10)
    for (let i = 0; i <= 10; i++) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-track-container';
        
        const label = document.createElement('label');
        label.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'momentum';
        checkbox.value = i.toString();
        checkbox.dataset.index = i.toString();
        
        // Add event listener
        checkboxContainer.addEventListener('click', (e) => {
            e.preventDefault();
            updateMomentumTrack(i);
            valueDisplay.textContent = i.toString();
        });
        
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'checkbox-value';
        valueLabel.textContent = i.toString();
        
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(valueLabel);
        trackContainer.appendChild(checkboxContainer);
    }
    
    container.appendChild(trackContainer);
    container.appendChild(valueDisplay);
}

// Function to update a checkbox track when a box is clicked
function updateCheckboxTrack(container: HTMLElement, index: number) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        const checkboxIndex = parseInt(checkbox.dataset.index as string);
        checkbox.checked = checkboxIndex <= index;
    });
}

// Function to update the momentum track
function updateMomentumTrack(value: number) {
    const checkboxes = momentumTrackEl.querySelector('.checkbox-track')!.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        const checkboxValue = parseInt(checkbox.dataset.index as string);
        checkbox.checked = checkboxValue === value;
    });
}

// Function to get the value of a checkbox track
function getCheckboxTrackValue(container: HTMLElement): number {
    const checkboxes = container.querySelector('.checkbox-track')!.querySelectorAll('input[type="checkbox"]');
    let value = 0;
    
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        if (checkbox.checked) {
            const checkboxValue = parseInt(checkbox.value);
            if (checkboxValue > value) {
                value = checkboxValue;
            }
        }
    });
    
    return value;
}

// Function to get the momentum value
function getMomentumValue(): number {
    const checkboxes = momentumTrackEl.querySelector('.checkbox-track')!.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) return 0;
    
    return parseInt((checkboxes[0] as HTMLInputElement).dataset.index as string);
}

// Function to set the value of a checkbox track
function setCheckboxTrackValue(container: HTMLElement, value: number) {
    const trackContainer = container.querySelector('.checkbox-track')!;
    const valueDisplay = container.querySelector('.meter-value-display')!;
    const checkboxes = trackContainer.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        const checkboxIndex = parseInt(checkbox.dataset.index as string);
        checkbox.checked = checkboxIndex < value;
    });
    
    // Check the exact value checkbox
    const valueCheckbox = Array.from(checkboxes).find(
        (checkbox: HTMLInputElement) => parseInt(checkbox.dataset.index as string) === value - 1
    ) as HTMLInputElement | undefined;
    
    if (valueCheckbox) {
        valueCheckbox.checked = true;
    }
    
    // Update the value display
    valueDisplay.textContent = value.toString();
}

// Function to set the momentum value
function setMomentumValue(value: number) {
    updateMomentumTrack(value);
    const valueDisplay = momentumTrackEl.querySelector('.meter-value-display')!;
    valueDisplay.textContent = value.toString();
}

// Function to update the UI with character data
function updateCharacterDisplay(character: Character): void {
    // Update name
    characterNameEl.value = character.name;
    
    // Update stats
    edgeEl.value = character.stats.edge.toString();
    heartEl.value = character.stats.heart.toString();
    ironEl.value = character.stats.iron.toString();
    shadowEl.value = character.stats.shadow.toString();
    witsEl.value = character.stats.wits.toString();
    
    // Update background
    backgroundEl.value = character.background;
    
    // Update condition meters
    setCheckboxTrackValue(healthTrackEl, character.condition.health);
    setCheckboxTrackValue(spiritTrackEl, character.condition.spirit);
    setCheckboxTrackValue(supplyTrackEl, character.condition.supply);
    setMomentumValue(character.condition.momentum);
    
    // Update assets
    currentAssets = [...character.assets];
    updateAssetsDisplay();
    
    // Update bonds and vows
    currentBonds = [...character.bonds];
    currentVows = [...character.vows];
    updateBondsDisplay();
    updateVowsDisplay();
}

// Function to create an asset card element
function createAssetCard(asset: Asset, isSelectable: boolean = false, clickHandler?: () => void): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'asset-card';
    if (isSelectable) {
        card.classList.add('selectable');
    }
    
    const header = document.createElement('div');
    header.className = 'asset-header';
    header.textContent = asset.name;
    card.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'asset-description';
    description.textContent = asset.description;
    card.appendChild(description);
    
    const abilities = document.createElement('div');
    abilities.className = 'asset-abilities';
    
    asset.abilities.forEach((ability, index) => {
        const abilityContainer = document.createElement('div');
        abilityContainer.className = 'ability-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = asset.checked[index];
        checkbox.id = `${asset.name.replace(/\s+/g, '-')}-ability-${index}`;
        checkbox.addEventListener('change', () => {
            asset.checked[index] = checkbox.checked;
        });
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = ability;
        
        abilityContainer.appendChild(checkbox);
        abilityContainer.appendChild(label);
        abilities.appendChild(abilityContainer);
    });
    
    card.appendChild(abilities);
    
    if (clickHandler) {
        card.addEventListener('click', (e) => {
            // Don't trigger the handler if clicking on a checkbox
            if (!(e.target as HTMLElement).closest('input[type="checkbox"]')) {
                clickHandler();
            }
        });
    }
    
    return card;
}

// Function to update the assets display
function updateAssetsDisplay(): void {
    assetsListEl.innerHTML = '';
    
    if (currentAssets.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No assets selected';
        assetsListEl.appendChild(emptyMessage);
        return;
    }
    
    currentAssets.forEach(asset => {
        const li = document.createElement('li');
        li.appendChild(createAssetCard(asset));
        assetsListEl.appendChild(li);
    });
}

// Function to create a bond element with checkbox progress
function createBondElement(bond: Bond, index: number): HTMLDivElement {
    const bondElement = document.createElement('div');
    bondElement.className = 'progress-track';
    
    const header = document.createElement('div');
    header.className = 'progress-track-header';
    
    const title = document.createElement('div');
    title.className = 'progress-track-title';
    title.textContent = bond.name;
    
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'progress-track-delete';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentBonds.splice(index, 1);
        updateBondsDisplay();
    });
    
    header.appendChild(title);
    header.appendChild(deleteBtn);
    bondElement.appendChild(header);
    
    // Create progress track with checkboxes
    const progressTrack = document.createElement('div');
    progressTrack.className = 'checkbox-track';
    
    for (let i = 0; i < 10; i++) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-track-container';
        
        const label = document.createElement('label');
        label.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = i < bond.progress;
        checkbox.dataset.index = i.toString();
        
        // Add event listener to handle clicking on checkboxes
        checkboxContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // If unchecking, update to the previous value
            if (checkbox.checked) {
                bond.progress = i;
            } 
            // If checking, update to this value
            else {
                bond.progress = i + 1;
            }
            
            updateBondProgress(progressTrack, bond.progress);
            
            // Update value display
            const valueDisplay = bondElement.querySelector('.meter-value-display');
            if (valueDisplay) {
                valueDisplay.textContent = bond.progress.toString();
            }
        });
        
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'checkbox-value';
        valueLabel.textContent = (i + 1).toString();
        
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(valueLabel);
        progressTrack.appendChild(checkboxContainer);
    }
    
    bondElement.appendChild(progressTrack);
    
    // Add value display
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'meter-value-display';
    valueDisplay.textContent = bond.progress.toString();
    bondElement.appendChild(valueDisplay);
    
    // Add edit functionality
    bondElement.addEventListener('click', () => {
        editingBondIndex = index;
        bondNameEl.value = bond.name;
        setCheckboxTrackValue(bondProgressEl, bond.progress);
        bondModal.style.display = 'block';
    });
    
    return bondElement;
}

// Function to update bond progress checkboxes
function updateBondProgress(container: HTMLElement, value: number) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        const checkboxIndex = parseInt(checkbox.dataset.index as string);
        checkbox.checked = checkboxIndex < value;
    });
}

// Function to create a vow element with checkbox progress
function createVowElement(vow: Vow, index: number): HTMLDivElement {
    const vowElement = document.createElement('div');
    vowElement.className = 'progress-track';
    
    const header = document.createElement('div');
    header.className = 'progress-track-header';
    
    const title = document.createElement('div');
    title.className = 'progress-track-title';
    title.textContent = vow.description;
    
    const rank = document.createElement('div');
    rank.className = 'progress-track-rank';
    rank.textContent = vow.rank;
    
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'progress-track-delete';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentVows.splice(index, 1);
        updateVowsDisplay();
    });
    
    header.appendChild(title);
    header.appendChild(rank);
    header.appendChild(deleteBtn);
    vowElement.appendChild(header);
    
    // Create progress track with checkboxes
    const progressTrack = document.createElement('div');
    progressTrack.className = 'checkbox-track';
    
    for (let i = 0; i < 10; i++) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-track-container';
        
        const label = document.createElement('label');
        label.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = i < vow.progress;
        checkbox.dataset.index = i.toString();
        
        // Add event listener to handle clicking on checkboxes
        checkboxContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // If unchecking, update to the previous value
            if (checkbox.checked) {
                vow.progress = i;
            } 
            // If checking, update to this value
            else {
                vow.progress = i + 1;
            }
            
            updateVowProgress(progressTrack, vow.progress);
            
            // Update value display
            const valueDisplay = vowElement.querySelector('.meter-value-display');
            if (valueDisplay) {
                valueDisplay.textContent = vow.progress.toString();
            }
        });
        
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'checkbox-value';
        valueLabel.textContent = (i + 1).toString();
        
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(valueLabel);
        progressTrack.appendChild(checkboxContainer);
    }
    
    vowElement.appendChild(progressTrack);
    
    // Add value display
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'meter-value-display';
    valueDisplay.textContent = vow.progress.toString();
    vowElement.appendChild(valueDisplay);
    
    // Add edit functionality
    vowElement.addEventListener('click', () => {
        editingVowIndex = index;
        vowDescriptionEl.value = vow.description;
        vowRankEl.value = vow.rank;
        setCheckboxTrackValue(vowProgressEl, vow.progress);
        vowModal.style.display = 'block';
    });
    
    return vowElement;
}

// Function to update vow progress checkboxes
function updateVowProgress(container: HTMLElement, value: number) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        const checkboxIndex = parseInt(checkbox.dataset.index as string);
        checkbox.checked = checkboxIndex < value;
    });
}

// Function to update the bonds display
function updateBondsDisplay(): void {
    bondsContainerEl.innerHTML = '';
    
    if (currentBonds.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'No bonds forged yet';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.color = '#c0c0c0';
        bondsContainerEl.appendChild(emptyMessage);
        return;
    }
    
    currentBonds.forEach((bond, index) => {
        bondsContainerEl.appendChild(createBondElement(bond, index));
    });
}

// Function to update the vows display
function updateVowsDisplay(): void {
    vowsContainerEl.innerHTML = '';
    
    if (currentVows.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'No vows sworn yet';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.color = '#c0c0c0';
        vowsContainerEl.appendChild(emptyMessage);
        return;
    }
    
    currentVows.forEach((vow, index) => {
        vowsContainerEl.appendChild(createVowElement(vow, index));
    });
}

// Function to check if an asset is in the current assets
function isAssetSelected(assetName: string): boolean {
    return currentAssets.some(asset => asset.name === assetName);
}

// Function to populate the asset selection modal
function populateAssetModal(): void {
    // Clear existing lists
    availableAssetsList.innerHTML = '';
    selectedAssetsList.innerHTML = '';
    
    // Populate available assets (excluding already selected ones)
    assetOptions.forEach(asset => {
        if (!isAssetSelected(asset.name)) {
            const li = document.createElement('li');
            
            // Create a deep copy of the asset to avoid modifying the original
            const assetCopy = JSON.parse(JSON.stringify(asset));
            
            li.appendChild(createAssetCard(assetCopy, true, () => {
                // Add to selected assets
                if (!isAssetSelected(assetCopy.name)) {
                    currentAssets.push(assetCopy);
                    populateAssetModal(); // Refresh lists
                }
            }));
            
            availableAssetsList.appendChild(li);
        }
    });
    
    // Populate selected assets
    currentAssets.forEach(asset => {
        const li = document.createElement('li');
        
        li.appendChild(createAssetCard(asset, true, () => {
            // Remove from selected assets
            currentAssets = currentAssets.filter(a => a.name !== asset.name);
            populateAssetModal(); // Refresh lists
        }));
        
        selectedAssetsList.appendChild(li);
    });
}

// Generate a character when the button is clicked
generateBtn.addEventListener('click', () => {
    const character = generateCharacter();
    updateCharacterDisplay(character);
});

// Open the asset selection modal
manageAssetsBtn.addEventListener('click', () => {
    populateAssetModal();
    assetModal.style.display = 'block';
});

// Open the bond modal to add a new bond
addBondBtn.addEventListener('click', () => {
    editingBondIndex = null;
    bondNameEl.value = '';
    setCheckboxTrackValue(bondProgressEl, 0);
    bondModal.style.display = 'block';
});

// Open the vow modal to add a new vow
addVowBtn.addEventListener('click', () => {
    editingVowIndex = null;
    vowDescriptionEl.value = '';
    vowRankEl.value = 'Troublesome';
    setCheckboxTrackValue(vowProgressEl, 0);
    vowModal.style.display = 'block';
});

// Close the asset modal
closeAssetModal.addEventListener('click', () => {
    assetModal.style.display = 'none';
});

// Close the bond modal
closeBondModal.addEventListener('click', () => {
    bondModal.style.display = 'none';
});

// Close the vow modal
closeVowModal.addEventListener('click', () => {
    vowModal.style.display = 'none';
});

// Close modals when clicking outside of them
window.addEventListener('click', (event) => {
    if (event.target === assetModal) {
        assetModal.style.display = 'none';
    } else if (event.target === bondModal) {
        bondModal.style.display = 'none';
    } else if (event.target === vowModal) {
        vowModal.style.display = 'none';
    }
});

// Save the selected assets
saveAssetsBtn.addEventListener('click', () => {
    updateAssetsDisplay();
    assetModal.style.display = 'none';
});

// Save the bond
saveBondBtn.addEventListener('click', () => {
    const bondName = bondNameEl.value.trim();
    if (!bondName) {
        alert('Please enter a bond name');
        return;
    }
    
    const bondProgress = getCheckboxTrackValue(bondProgressEl);
    
    if (editingBondIndex !== null) {
        // Edit existing bond
        currentBonds[editingBondIndex] = {
            name: bondName,
            progress: bondProgress
        };
    } else {
        // Add new bond
        currentBonds.push({
            name: bondName,
            progress: bondProgress
        });
    }
    
    updateBondsDisplay();
    bondModal.style.display = 'none';
});

// Save the vow
saveVowBtn.addEventListener('click', () => {
    const vowDescription = vowDescriptionEl.value.trim();
    if (!vowDescription) {
        alert('Please enter a vow description');
        return;
    }
    
    const vowRank = vowRankEl.value;
    const vowProgress = getCheckboxTrackValue(vowProgressEl);
    
    if (editingVowIndex !== null) {
        // Edit existing vow
        currentVows[editingVowIndex] = {
            description: vowDescription,
            rank: vowRank,
            progress: vowProgress
        };
    } else {
        // Add new vow
        currentVows.push({
            description: vowDescription,
            rank: vowRank,
            progress: vowProgress
        });
    }
    
    updateVowsDisplay();
    vowModal.style.display = 'none';
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize checkbox tracks
    initializeCheckboxTracks();
    
    // Generate an initial character
    const character = generateCharacter();
    updateCharacterDisplay(character);
});