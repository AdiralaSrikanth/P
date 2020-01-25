'use strict';

var visibility = false;

var showDetails = function showDetails() {
    visibility = !visibility;
    render();
};
var render = function render() {
    var templateTwo = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Toggle Bar'
        ),
        React.createElement(
            'button',
            { onClick: showDetails },
            visibility ? 'Hide details' : 'Show details'
        ),
        React.createElement(
            'p',
            null,
            visibility && 'Education, Profile and native place'
        )
    );
    ReactDOM.render(templateTwo, appRoot);
};

var appRoot = document.getElementById('app');
render();
