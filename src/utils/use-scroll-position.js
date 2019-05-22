module.exports = (element) => {

    if (element === null) return;
    
    let windowHeight = window.innerHeight;

    const check = () => {
        const clientRect = element.getBoundingClientRect();
        const elCenterPosition = (clientRect.top + clientRect.bottom - windowHeight) / 2;

        element.style.setProperty('--scroll-position', elCenterPosition);
    }

    window.addEventListener('scroll', check);
    check();

}