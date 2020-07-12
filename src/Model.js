import Context from './Context';

export default (function Model() {

    const score = [{
        name: 'Ant',
        score: 0,
        type: 'player1'
    }, {
        name: 'Felix',
        score: 0,
        type: 'player2'
    }];

    const scoreList = [score];

    const updatePlayer = update => {
        const currentScore = scoreList[scoreList.length - 1];
        const newScore = currentScore.map(player => {
            if (player.type === update.playerType) {
                return {
                    ...player,
                    name: update.playerName
                }
            }
            return player;
        });

        scoreList.push(newScore);
        Context.fireEvent('modelUpdate', newScore);
    }

    const updateScore = update => {
        const currentScore = scoreList[scoreList.length - 1];
        const playerScoring = currentScore.find(player => player.type === update.playerType);
        const score = playerScoring.score + 1;
        const newScore = currentScore.map(player => {
            if (player.type === update.playerType) {
                return {
                    ...player,
                    score
                }
            }
            return player;
        });

        scoreList.push(newScore);
        Context.fireEvent('modelUpdate', newScore);
    }

    const undo = () => {
        if (!scoreList.length) return;
        scoreList.pop();
        const previousScore = scoreList[scoreList.length -1];
        Context.fireEvent('modelUpdate', previousScore);
    }

    return {
        updatePlayer,
        updateScore,
        undo
    }
})();