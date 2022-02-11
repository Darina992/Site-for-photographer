import i18Obj from './translate.js';

//обработка бургера
const buttonBurger = document.querySelector('.burger-menu');
const menu = document.querySelector('.nav');
const arrOfStringsOfButtonBurger = buttonBurger.querySelectorAll('div');
console.log(arrOfStringsOfButtonBurger);
buttonBurger.addEventListener("click",function(event){
  if(menu.classList.contains('open')){
    menu.classList.remove('open');
    arrOfStringsOfButtonBurger.forEach((elem) => elem.classList.remove('change'));
  } else{
    menu.classList.add('open');
    arrOfStringsOfButtonBurger.forEach((elem) => elem.classList.add('change'));
  }
})
//закрытие меню при переходе на пункт меню
menu.addEventListener("click",function(event){
  if(event.target.closest('a')){
    if(menu.classList.contains('open')){
      menu.classList.remove('open');
      arrOfStringsOfButtonBurger.forEach((elem) => elem.classList.remove('change'));
    } else{
      menu.classList.add('open');
      arrOfStringsOfButtonBurger.forEach((elem) => elem.classList.add('change'));
    }
  }
})
//обработка кнопок и смена изображений
const portfolioButtons = document.querySelector('.portfolio-buttons');
const portfolioButtonsAll = document.querySelectorAll('.portfolio-button');
const portfolioImages = document.querySelectorAll('.portfolio-image');
portfolioButtons.addEventListener("click",function(event){
  if(event.target.closest('button')){
    changeImage(event.target.dataset.season);
    portfolioButtonsAll.forEach((item, i) => {
      item.classList.remove('button-active');
    });
    changeClassActive(event.target,'button-active')
  }
})
function changeImage(season){
  portfolioImages.forEach((item, i) => {
    item.src = `./assets/img/${season}/${i + 1}.jpg`;
  })
}
function changeClassActive(elem,classAdd){
  elem.classList.add(`${classAdd}`);
}
//кэширование изображений
function preloadImages() {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  seasons.forEach((item, i) => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${item}/${i}.jpg`;
    }
  });
}
preloadImages();
//перевод на 2 языка
const switcherLng = document.querySelector('.header-switch-lng');
const lng = switcherLng.querySelectorAll('a');
switcherLng.addEventListener("click",function(event){
  if(event.target.closest('a')){
    setLocalStorageLang(event.target.dataset.lng);
    getTranslate(event.target.dataset.lng);
    lng.forEach((item) => {
      item.classList.remove('cold-color');
    });
    changeClassActive(event.target,'cold-color');
  }
})
function getTranslate(lang){
  const elementWithDataAttr = document.querySelectorAll('[data-i18]');
  elementWithDataAttr.forEach((item, i) => {
    if(lang === 'ru'){
      item.textContent = i18Obj['ru'][`${item.dataset.i18}`];
    } else {
      item.textContent = i18Obj['en'][`${item.dataset.i18}`]
    }
  });
}
//переключение темы
function switchTheme(color) {
  const skills = document.getElementById('skills');
  const portfolio = document.getElementById('portfolio');
  const video = document.getElementById('video');
  const price = document.getElementById('price');
  const skillsConteiner = document.querySelector('.skills-conteiner');
  const portfolioConteiner = document.querySelector('.portfolio-conteiner');
  const videoConteiner = document.querySelector('.video-conteiner');
  const priceConteiner = document.querySelector('.price-conteiner');
  const navOpen = document.querySelector('.nav-list');
  const navLink = document.querySelectorAll('.nav-link');
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerMenuBar = burgerMenu.querySelectorAll('div');
  const titleConteiner = document.querySelectorAll('.title-conteiner');
  const sectionTitle = document.querySelectorAll('.section-title');
  const elemSwichTheme = [skills,skillsConteiner,portfolio,portfolioConteiner,
    video,videoConteiner,price,priceConteiner];
  if(color === 'light'){
    elemSwichTheme.forEach((item) => {
      item.classList.add('light-theme');
    });
    navOpen.classList.add('light');
    titleConteiner.forEach((item) => {
      item.classList.add('light-theme');
    });
    sectionTitle.forEach((item) => {
      item.classList.add('light-theme');
    });
    navLink.forEach((item) => {
      item.classList.add('light');
    });
    portfolioButtonsAll.forEach((item, i) => {
      item.classList.add('light-theme');
    });
    burgerMenuBar.forEach((item, i) => {
      item.classList.add('light-theme');
    });
  } else {
    elemSwichTheme.forEach((item) => {
      item.classList.remove('light-theme');
    });
    navOpen.classList.remove('light');
    titleConteiner.forEach((item) => {
      item.classList.remove('light-theme');
    });
    sectionTitle.forEach((item) => {
      item.classList.remove('light-theme');
    });
    navLink.forEach((item) => {
      item.classList.remove('light');
    });
    portfolioButtonsAll.forEach((item, i) => {
      item.classList.remove('light-theme');
    });
    burgerMenuBar.forEach((item, i) => {
      item.classList.remove('light-theme');
    });
  }

}
const switcherTheme = document.querySelector('.header-switch-color');
switcherTheme.addEventListener("click",function(event){
  if(switcherTheme.classList.contains('switch-dark-color')){
    switchTheme('dark');
    setLocalStorageTheme('dark');
    switcherTheme.classList.remove('switch-dark-color');
  } else{
    switchTheme('light');
    setLocalStorageTheme('light');
    switcherTheme.classList.add('switch-dark-color');
  }
});
//localStorage
function setLocalStorageLang(lang) {
  localStorage.setItem('lang', lang);
}
function setLocalStorageTheme(theme) {
  localStorage.setItem('theme', theme);
}
function getLocalStorage() {
  if(localStorage.getItem('lang')) {
   let lang = localStorage.getItem('lang');
   if(lang === 'en'){
     lng[0].classList.add('cold-color');
   } else {
     lng[1].classList.add('cold-color');
   }
   getTranslate(lang);
 } else {
   lng[0].classList.add('cold-color');
 }
  if(localStorage.getItem('theme')){
    let theme = localStorage.getItem('theme');
    switchTheme(theme);
    if(theme === 'light'){
      switcherTheme.classList.add('switch-dark-color');
    }
  }
}
window.addEventListener('load', getLocalStorage)
