import { render } from "./JsxConverter";
import Context from './Context';

const viewport = require('./views/Viewport');
require('./web/index.html');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

const app = (() => {
    let root;

    const renderViewport = () => {
        render(viewport.default(), root);
    };

    const update = () => {
        root.innerHTML = '';
        renderViewport();
    };

    document.addEventListener('DOMContentLoaded', () => {
        root = document.getElementById('root');
        renderViewport();

        Context.subscribeToEvent('modelUpdate', scores  => {
            update();
        });
    });

    return {update};

})();

export default app;
