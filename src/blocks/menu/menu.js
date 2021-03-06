class Menu {
  constructor(root) {
    this.submenus = root.querySelectorAll('.js-menu__submenu');
    this.submenus.forEach((it) => {
      const element = it.closest('.js-menu__element');
      element.addEventListener('click', this.#handlerElementClick);
    });
  }

  #handlerElementClick = (e) => {
    const element = e.target.closest('.js-menu__element');
    const submenu = element.querySelector('.js-menu__submenu');
    element.classList.toggle('menu__element_active');
    submenu.classList.toggle('menu__submenu_active');
    element.querySelector('.arrow').textContent = element.classList.contains('menu__element_active')
      ? 'expand_less'
      : 'expand_more';
  }
}

export default Menu;
