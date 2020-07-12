import JsxConverter, { render } from '../JsxConverter';
import { fireAction, ACTIONS } from '../actions/actionHandler';
import Context from '../Context';

let player1Name = 'Ant';
let player2Name = 'Felix';

Context.subscribeToEvent('modelUpdate', scores  => {
    scores.forEach(score => {
        if (score.type === 'player1') {
            player1Name = score.name;
        } else {
            player2Name = score.name;
        }
    });
});

const flexDirection = document.getElementsByTagName('body')[0].clientWidth > 480 ? 'row' : 'column';
const headerStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection,
    backgroundColor: '#DD6B20'
}

const playerStyle = {
    flex: 1,
    textAlign: 'center'
}

const inputStyle = {
    border: 0,
    backgroundColor: 'transparent',
    color: '#FFFAF0',
    fontSize: '3em',
    textAlign: 'center',
    width: '100%'
}

const labelStyle = {
    display: 'none',
    ariaHidden: 'false'
}

const undoStyle = {
    flexShrink: 2,
    cursor: 'pointer',
    padding: '1rem',
    border: '1px solid #9C4221',
    position: 'absolute',
    backgroundColor: '#C05621',
    borderRadius: '5px'
}

const updatePlayerHandler = e => {
    fireAction(ACTIONS.UPDATE_PLAYER, {
        playerName: e.target.value, 
        playerType: e.target.id
    });
}

const undoHandler = e => {
    fireAction(ACTIONS.UNDO);    
}

export default function Header() {
    return (<form className="header" style={headerStyle}>
        <div style={playerStyle} className="player-style">
            <label style={labelStyle} htmlFor="player1" >Player 1</label>
            <input style={inputStyle} name="player1" id="player1" value={ player1Name } onBlur={ updatePlayerHandler }/>
        </div>
        <div style={playerStyle} className="player-style" >
            <label style={labelStyle} htmlFor="player2" >Player 2</label>
            <input style={inputStyle} name="player2" id="player2" value={ player2Name } onBlur={ updatePlayerHandler }/>
        </div>
        <div style={undoStyle} onClick={ undoHandler} >U</div>
    </form>);
}