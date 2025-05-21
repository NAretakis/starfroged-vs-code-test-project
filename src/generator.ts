import { Character, CharacterStats, nameOptions, backgroundOptions, assetOptions, Asset, CharacterCondition, Bond, Vow, vowRanks } from './types';

// Function to get a random item from an array
function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate random stats
function generateStats(): CharacterStats {
    // In Ironsworn, you distribute +3, +2, +1, 0, and -1 among the five stats
    const statValues = [3, 2, 1, 0, -1];
    
    // Shuffle the stat values
    for (let i = statValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [statValues[i], statValues[j]] = [statValues[j], statValues[i]];
    }
    
    return {
        edge: statValues[0],
        heart: statValues[1],
        iron: statValues[2],
        shadow: statValues[3],
        wits: statValues[4]
    };
}

// Function to generate random assets (1-3)
function generateAssets(): Asset[] {
    const numAssets = Math.floor(Math.random() * 3) + 1; // 1 to 3 assets
    const assets: Asset[] = [];
    
    // Create a copy of the asset options to avoid duplicates
    const availableAssets = [...assetOptions];
    
    for (let i = 0; i < numAssets; i++) {
        if (availableAssets.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableAssets.length);
        // Create a deep copy of the asset to avoid modifying the original
        const asset = JSON.parse(JSON.stringify(availableAssets[randomIndex]));
        assets.push(asset);
        availableAssets.splice(randomIndex, 1);
    }
    
    return assets;
}

// Function to generate default condition meters
function generateCondition(): CharacterCondition {
    return {
        health: 5,
        spirit: 5,
        supply: 5,
        momentum: 2
    };
}

// Function to generate a random bond
function generateBond(): Bond {
    const bondNames = [
        "Village of Thornhallow",
        "Clan Ironheart",
        "Merchant Guild of Ravenport",
        "The Mystics of Eldergrove",
        "Survivors of Ashfall"
    ];
    
    return {
        name: getRandomItem(bondNames),
        progress: 0
    };
}

// Function to generate a random vow
function generateVow(): Vow {
    const vowDescriptions = [
        "Find the lost artifact of my ancestors",
        "Avenge the death of my mentor",
        "Protect the village from raiders",
        "Discover the truth about the ancient ruins",
        "Break the curse afflicting my family"
    ];
    
    return {
        description: getRandomItem(vowDescriptions),
        rank: getRandomItem(vowRanks),
        progress: 0
    };
}

// Main function to generate a character
export function generateCharacter(): Character {
    // Generate 0-1 bonds
    const numBonds = Math.floor(Math.random() * 2);
    const bonds: Bond[] = [];
    for (let i = 0; i < numBonds; i++) {
        bonds.push(generateBond());
    }
    
    // Generate 0-2 vows
    const numVows = Math.floor(Math.random() * 3);
    const vows: Vow[] = [];
    for (let i = 0; i < numVows; i++) {
        vows.push(generateVow());
    }
    
    return {
        name: getRandomItem(nameOptions),
        stats: generateStats(),
        background: getRandomItem(backgroundOptions),
        assets: generateAssets(),
        condition: generateCondition(),
        bonds: bonds,
        vows: vows
    };
}