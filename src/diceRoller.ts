class DiceRoller {
    private container: HTMLElement;
    private isRolling: boolean = false;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public async rollDice(): Promise<number[]> {
        if (this.isRolling) return [];
        this.isRolling = true;

        // Generate random results immediately
        const results = [
            Math.floor(Math.random() * 6) + 1,  // d6
            Math.floor(Math.random() * 10) + 1, // d10
            Math.floor(Math.random() * 10) + 1  // d10
        ];

        this.isRolling = false;
        return results;
    }

    public dispose(): void {
        this.container.textContent = '';
    }
}

export default DiceRoller;