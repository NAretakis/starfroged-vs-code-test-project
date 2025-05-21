// Define the character stats interface
export interface CharacterStats {
    edge: number;
    heart: number;
    iron: number;
    shadow: number;
    wits: number;
}

// Define the asset interface
export interface Asset {
    name: string;
    description: string;
    abilities: string[];
    checked: boolean[];
}

// Define the character condition meters
export interface CharacterCondition {
    health: number;
    spirit: number;
    supply: number;
    momentum: number;
}

// Define a bond interface
export interface Bond {
    name: string;
    progress: number;
}

// Define a vow interface
export interface Vow {
    description: string;
    rank: string;
    progress: number;
}

// Define the character interface
export interface Character {
    name: string;
    stats: CharacterStats;
    background: string;
    assets: Asset[];
    condition: CharacterCondition;
    bonds: Bond[];
    vows: Vow[];
}

// Define name options
export const nameOptions: string[] = [
    "Aeric", "Brana", "Clovis", "Dagna", "Elstan", 
    "Fenna", "Gorm", "Halla", "Ivar", "Jora",
    "Keelan", "Lira", "Morten", "Nessa", "Oskar",
    "Phelan", "Runa", "Silas", "Thora", "Varga"
];

// Define background options
export const backgroundOptions: string[] = [
    "Raised in a small fishing village on the coast",
    "Former soldier who served in the border wars",
    "Apprentice to a renowned blacksmith",
    "Child of traveling merchants who roamed the Ironlands",
    "Orphaned at a young age and raised by the village elder",
    "Descended from a line of mystics and healers",
    "Grew up in the deep forests as part of a secluded community",
    "Former prisoner who earned freedom through service",
    "Raised in a settlement that was destroyed by raiders",
    "Trained as a scout for a frontier outpost"
];

// Define vow ranks
export const vowRanks: string[] = [
    "Troublesome", "Dangerous", "Formidable", "Extreme", "Epic"
];

// Define asset options with full details
export const assetOptions: Asset[] = [
    {
        name: "Swordmaster",
        description: "You are skilled in the use of bladed weapons and fight with precision and grace.",
        abilities: [
            "When you Secure an Advantage or Compel by taking a stance with your blade, add +1.",
            "When you Strike with a sword, you may add +1 and inflict +1 harm on a strong hit.",
            "When you Clash and score a hit, you may add +1 momentum on a weak hit, or +2 momentum on a strong hit."
        ],
        checked: [false, false, false]
    },
    {
        name: "Archer",
        description: "You are an expert with the bow, able to hit targets with remarkable accuracy.",
        abilities: [
            "When you Secure an Advantage by taking careful aim with your bow, add +1.",
            "When you Strike with your bow, you may add +1 and inflict +1 harm on a strong hit.",
            "When you Resupply by hunting for food, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Healer",
        description: "You are knowledgeable in the treatment of injuries and ailments.",
        abilities: [
            "When you Heal someone, add +1 and take +1 momentum on a hit.",
            "When you Heal yourself, add +1 and take +1 momentum on a hit.",
            "When you Sojourn in a community, you may attempt to Heal someone in need. If you do, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Infiltrator",
        description: "You are adept at stealth and deception, able to slip past guards unnoticed.",
        abilities: [
            "When you Secure an Advantage or Face Danger by moving silently or blending into your surroundings, add +1.",
            "When you Gather Information by infiltrating a hostile area, add +1.",
            "When you Compel someone by threatening to reveal their secrets, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Beastmaster",
        description: "You have a natural affinity with animals and can communicate with them on a primal level.",
        abilities: [
            "When you Secure an Advantage by directing your animal companion in a task suited to its nature, add +1.",
            "When you Endure Stress in the company of your animal companion, add +1.",
            "When you Face Danger to protect your animal companion, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Ritualist",
        description: "You are practiced in mystical ceremonies that invoke ancient powers.",
        abilities: [
            "When you Secure an Advantage by performing a ritual, add +1.",
            "When you Face Danger or Endure Stress from mystical forces, add +1.",
            "When you Fulfill Your Vow by completing a ritual, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Navigator",
        description: "You have an innate sense of direction and knowledge of the stars and landscapes.",
        abilities: [
            "When you Undertake a Journey, add +1 for each segment.",
            "When you Secure an Advantage by studying a map or charting a course, add +1.",
            "When you Resupply by foraging in the wilderness, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Alchemist",
        description: "You are skilled at brewing potions and elixirs with various effects.",
        abilities: [
            "When you Secure an Advantage by crafting an elixir, add +1.",
            "When you Heal using one of your concoctions, add +1.",
            "When you Face Danger by using an alchemical solution to overcome an obstacle, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Lorekeeper",
        description: "You possess vast knowledge of history, legends, and ancient wisdom.",
        abilities: [
            "When you Gather Information by recalling details about a person, place, or thing, add +1.",
            "When you Secure an Advantage by applying your knowledge of history or lore, add +1.",
            "When you Forge a Bond with someone by sharing meaningful stories or knowledge, add +1."
        ],
        checked: [false, false, false]
    },
    {
        name: "Ranger",
        description: "You are an experienced wilderness survivor, able to thrive in harsh environments.",
        abilities: [
            "When you Undertake a Journey through the wilderness, add +1 for each segment.",
            "When you Resupply in the wild, add +1.",
            "When you Secure an Advantage by tracking a person or creature, add +1."
        ],
        checked: [false, false, false]
    }
];