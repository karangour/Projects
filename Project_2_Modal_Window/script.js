const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
let i = 0;
while (i < btnsOpenModal.length) {
  btnsOpenModal[i].addEventListener('click', openModal); //openModal with the () has to be called because it needs to execute AFTER click and not as soon as it's read by JS.
  i++;
}
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape') && !(modal.classList.contains('hidden'))) closeModal();
    
})