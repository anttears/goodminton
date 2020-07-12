import JsxConverter, { render } from '../JsxConverter';
import { fireAction, ACTIONS } from '../actions/actionHandler';
import Context from '../Context';

let score1 = 0;
let score2 = 0;
let matchEnded = false;

Context.subscribeToEvent('modelUpdate', scores  => {
    if (matchEnded) return;

    const [s1, s2] = scores.map(score => score.score);
    const difference = s1 - s2;
    const positiveDifference = difference > -1 ? difference : difference * -1;
    if ((s1 > 21 || s2 > 21) && positiveDifference > 2) {
        matchEnded = true;
        return;
    }

    score1 = s1;
    score2 = s2;
});

const flexDirection = document.getElementsByTagName('body')[0].clientWidth > 480 ? 'row' : 'column';
const headerStyle = {
    display: 'flex',
    flexDirection: flexDirection,
    flexGrow: '1',
}

const player1Style = {
    flex: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#C05621',
    fontSize: '4rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer'
}

const player2Style = {
    ...player1Style,
    backgroundColor: '#7B341E'
}

const scoreHandler = e => {
    fireAction(ACTIONS.UPDATE_SCORE, {
        playerType: e.currentTarget.dataset.player
    });
}

export default function Score() {
    return (<div className="header" style={headerStyle}>
        <div style={player1Style} data-player="player1" onClick={ scoreHandler }>
        <div id="player1">{ `${score1}`  }</div>
        </div>
        <div style={player2Style} data-player="player2" onClick={ scoreHandler }>
            <div id="player2">{ `${score2}` }</div>
        </div>
    </div>);
}