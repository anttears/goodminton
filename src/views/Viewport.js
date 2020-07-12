import JsxConverter, { render } from '../JsxConverter';
import Header from './Header';
import Score from './Score';

const viewportStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
}

export default function Viewport() {
    return (<div className="viewport" style={viewportStyle}>
        <Header></Header>
        <Score></Score>
    </div>);
}
