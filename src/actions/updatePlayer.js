import model from '../Model';

export default function updatePlayer(payload) {
    model.updatePlayer({
        playerType: payload.playerType,
        playerName: payload.playerName
    });
}