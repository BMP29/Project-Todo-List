const btnTheme = document.getElementById('btnTheme');

btnTheme.addEventListener('click', () => {
    const root = document.documentElement;

    let theme = root.getAttribute('data-theme');

    if(theme == 'light') {
        root.setAttribute('data-theme', 'dark');
        btnTheme.classList.replace('sun', 'moon');
    }else if(theme == 'dark') {
        root.setAttribute('data-theme', 'light');
        btnTheme.classList.replace('moon', 'sun');
    }
});