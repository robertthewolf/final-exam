const getFontawesomeIcon = (s) => {
    s = s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
    s = s.charAt(0).toUpperCase() + s.slice(1);
    s = 'fa' + s
    let icon = require('@fortawesome/free-solid-svg-icons')[s]
    if (icon === undefined) icon = require('@fortawesome/fontawesome-free-brands')[s]
    return icon
}

export default getFontawesomeIcon