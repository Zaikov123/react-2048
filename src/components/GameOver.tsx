import React from 'react';

interface GameOverProps {
    onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
    return (
        <>
            <p className="text-center mb-4">The game is over! Do you want to restart?</p>
            <div className="flex justify-center">
                <button
                    className="px-4 py-2 bg-slate-900 text-white rounded-md"
                    onClick={onRestart}
                >
                    Restart Game
                </button>
            </div>
        </>
    )
}

export default GameOver;
