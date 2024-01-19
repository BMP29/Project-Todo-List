const btnSB = document.getElementById('btnSideBar');
const sideBar = document.getElementById('sidebar');

btnSB.addEventListener('click', () => {
    let marginLeft = window.getComputedStyle(sideBar).getPropertyValue('margin-left');
    const hidden = '-280px';
    const unhide = '0';

    if(marginLeft == hidden) {
        sideBar.style.marginLeft = unhide; 
    }else {
        sideBar.style.marginLeft = hidden; 
    }
});