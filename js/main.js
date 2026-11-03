(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-site-menu]');

  root.classList.remove('no-js');
  root.classList.add('js');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('is-open', !isOpen);
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  var currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('[data-nav-link]').forEach(function (link) {
    var linkUrl = new URL(link.href, window.location.origin);
    var linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
    if (link.hash && currentPath === '/') return;
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.indexOf(linkPath + '/') === 0)) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
