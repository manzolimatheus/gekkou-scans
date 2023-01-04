export function loadLocalStorageTheme() {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'))

    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    return darkMode;
}