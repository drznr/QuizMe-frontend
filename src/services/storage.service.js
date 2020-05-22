export const storageService = {
    store,
    load
}


function store(key, value, session = false) {
    const storage = (session) ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(value));
}

function load(key, session = false) {
    const storage = (session) ? sessionStorage : localStorage;
    return JSON.parse(storage.getItem(key));
}
