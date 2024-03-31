const btnSB = document.getElementById('btnSideBar');
const sideBar = document.getElementById('sidebar');

btnSB.addEventListener('click', () => {
    hidden = sideBar.classList.contains('hidden');

    if(hidden == true) sideBar.classList.remove('hidden');
    else sideBar.classList.add('hidden');
});