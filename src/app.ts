/**
 * Ironsworn Character Generator
 * Main application file that handles UI interactions and character management
 * Uses CMS Design System for UI components and styling
 */
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

/**
 * Initialize checkbox tracks for all condition meters and progress tracks
 */
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

/**
 * Creates a checkbox track for condition meters and progress tracks
 * @param container - The HTML element to contain the track
 * @param count - Number of checkboxes to create
 * @param name - Name identifier for the track
 */
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