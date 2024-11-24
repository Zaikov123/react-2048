class ScoreManager {
    private score = 0;

    getScore() {
        return this.score;
    }

    updateScore(value: number) {
        this.score += value;
        console.log(`Score updated: ${this.score}`);
    }
}

export const scoreManager = new ScoreManager();