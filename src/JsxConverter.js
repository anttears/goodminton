/**
 * TODO and this is a pretty big todo. Converting jsx on the fly, in the browser at runtime is going to be amazingly slow.
 * So, while this is a proof of concept only, it's still something to think about. 
 */


/**
 * Append values to the parent, text nodes, or elements, or arrays of both.
 * 
 * @param {String | HTMLElement} elem 
 * @param {String | string[] | HTMLElement | HTMLElement[]} [children] 
 */
const appendChild = (elem, children) => {

    if (!children) {
        return;
    }

    if (Array.isArray(children)) {
        children.map(child => appendChild(elem, child));
        return;
    }

    const child = children;

    if (child && child.nodeType === Node.ELEMENT_NODE ) {
        elem.appendChild(child);
        return;
        
    }
    
    if (child.toString) {
        const textNode = document.createTextNode(child.toString());
        elem.appendChild(textNode);
        return;
    }

    console.log('If we get here, then I\'ve missed something important', child);

}
  
function splitCamelCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * 
 * @param {String | Function | HTMLElement} elem 
 * @param {Object} attrs - Attributes to be added to the elem
 */
function createElement(elem, attrs) {
    // TODO - I know from the React docs it needs supported, to investigate how to implement an instance of it
    if (typeof elem.render === "function") {
        return elem.render();
    }

    if (elem instanceof Function) { // Main usecase is the function returned by babel
        return elem(attrs);
    }

    if (elem instanceof HTMLElement) {
        addAttributes(elem, attrs);
        return elem;
    }

    const element = document.createElement(elem);
    addAttributes(element, attrs);
    return element;
}

/**
 * 
 * @param {HTMLElement} elem 
 * @param {Object} attrs 
 */
function addAttributes(elem, attrs) {
    const attrsType = typeof attrs;
    const hasAttributes = attrs !== null && typeof attrs !== 'undefined';
    const attributes = hasAttributes ? attrs : {};

    for (const [attr, value] of Object.entries(attributes)) {
        const valueType = typeof value;
        const isNullValue = value === null;

        /**
         * Boolean attributes like disabled are handled.
         * true = disabled
         * false = attribute isn't present
         **/
        if (value === true) {
            elem.setAttribute(attr, attr);
        
        } else if (attr.startsWith("on") && valueType === "function") {
        
            // from jsx format e.g. `onClick`
            elem.addEventListener(attr.substr(2).toLowerCase(), value); 

        } else if (value !== false && !isNullValue && valueType !== 'undefined') {

            if (valueType === 'object' && !isNullValue) {
                const modifier = attr === "style" ? splitCamelCase : str => str.toLowerCase();
                // Style properties or object props
                const objectValues = Object.entries(value).map(([key, val]) => `${modifier(key)}: ${val}`).join("; ");
                elem.setAttribute(attr, objectValues);

            } else if (attr === "className" && value !== "") {
                elem.classList.add(...(value.toString().trim().split(" ")));
                
            } else {
                elem.setAttribute(attr, value.toString());
            }
        }
    }
}

/**
 * Called from APP - is called after all of the elements are created.
 * 
 * @param {HTMLElement} elem 
 * @param {HTMLElement} parent 
 */
export function render(elem, parent) {
    parent.insertAdjacentElement("afterbegin", elem);
}

/**
 * This is the default method for converting jsx into elements.
 * It is set as the method called on all jsx found in a file.
 * While this isn't done explicitly, each view imports this method and babel uses it during tranpilation.
 * See .webpack.config.js for where it's used as part of transform-react-jsx.
 * Sadly, it looks like we'll need to add an eslint ignore as the var is called but never used in the file.
 * 
 * @param {String | function | HTMLElement} tag - Depending if the child is nested
 * @param {Object or null*} props - The props to be converted to attributes, so things like `className` or data values like properties.
 * @param  {...String | HTMLElement} [children] 
 */
export default function(tag, props, ...children) {
    const elem = createElement(tag, props);

    for (const child of children) {
        appendChild(elem, child);
    }

    return elem;
}