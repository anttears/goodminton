import model from '../Model';

export default function updateScore(payload) {
    model.updateScore({
        playerType: payload.playerType,
    });
}