import updatePlayer from './updatePlayer';
import updateScore from './updateScore';
import undo from './undo';

const ACTIONS = {
    'UPDATE_PLAYER': 'UPDATE_PLAYER',
    'UPDATE_SCORE': 'UPDATE_SCORE',
    'UNDO': 'UNDO'
};

const ACTION_METHODS = {
    'UPDATE_PLAYER': updatePlayer,
    'UPDATE_SCORE': updateScore,
    'UNDO': undo
};

const fireAction = (action, config) => {
    ACTION_METHODS[action]({
        action,
        ...config
    });
};

export {
    ACTIONS,
    fireAction
};
