export const utilService = {
    getRandomColor,
    makeId
}

function getRandomColor() {
    const opts = [
        '#6320EE', '#686963', '#E4572E', '#FB5012', '#177E89', '#5F464B', '#638475', '#950952', '#854D27'
    ];
    return opts[Math.floor(Math.random() * opts.length)];
}

function makeId(length = 10) {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';

    for (let i = 0; i < length; i++) {
        pass += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }

    return pass;
}
