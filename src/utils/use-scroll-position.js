var {useState} = require('react');

module.exports = function useReveal(element) {

    if (element === null) return cleanUp;
    
    var windowHeight = window.innerHeight;

    var cleanUp = () => {
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', onResize);
    }

    var check = () => {
        var clientRect = element.getBoundingClientRect();
        var elCenterPosition = (clientRect.top + clientRect.bottom - windowHeight) / 2;

        element.style.setProperty('--scroll-position', elCenterPosition);
    }

    var onResize = () => {
        windowHeight = window.innerHeight;
        check();
    }

    window.addEventListener('scroll', check);
    window.addEventListener('resize', onResize);
    check();

    return cleanUp;
}