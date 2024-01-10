const btnTheme = document.getElementById('btnTheme');

btnTheme.addEventListener('click', () => {
    let className = btnTheme.className;

    if(className == 'sun') {
        btnTheme.classList.replace(className, 'moon');
    }else if(className == 'moon') {
        btnTheme.classList.replace(className, 'sun');
    }
});