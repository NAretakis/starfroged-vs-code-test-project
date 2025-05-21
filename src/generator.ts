/**
 * Ironsworn Character Generator
 * Character generation logic for creating random Ironsworn characters
 */
import { Character, CharacterStats, nameOptions, backgroundOptions, assetOptions, Asset, CharacterCondition, Bond, Vow, vowRanks } from './types';

/**
 * Gets a random item from an array
 * @param array - The array to select from
 * @returns A random item from the array
 */
function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates random stats for a character
 * In Ironsworn, stats are +3, +2, +1, 0, and -1 distributed among the five stats
 * @returns A CharacterStats object with randomized values
 */
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

/**
 * Generates random assets (1-3) for a character
 * @returns An array of Asset objects
 */
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

/**
 * Generates default condition meters for a character
 * @returns A CharacterCondition object with default values
 */
function generateCondition(): CharacterCondition {
    return {
        health: 5,
        spirit: 5,
        supply: 5,
        momentum: 2
    };
}

/**
 * Generates a random bond
 * @returns A Bond object with random name and zero progress
 */
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

/**
 * Generates a random vow
 * @returns A Vow object with random description, rank, and zero progress
 */
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

/**
 * Main function to generate a complete character
 * @returns A fully populated Character object
 */
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