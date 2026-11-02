/**
 * main.js — минимальная интерактивность для КР №1.
 * Открытие/закрытие модальных окон через hash (#modal-id).
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    if (!modals.length) return;

    function closeAllModals() {
      modals.forEach(function (m) { m.classList.remove('modal--open'); });
      document.body.style.overflow = '';
    }

    function openModalByHash(hash) {
      if (!hash || hash === '#') return;
      var target = document.querySelector(hash);
      if (!target || !target.classList.contains('modal')) return;
      closeAllModals();
      target.classList.add('modal--open');
      document.body.style.overflow = 'hidden';
      var closeBtn = target.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    }

    function cleanHash() {
      if (history.replaceState) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Открытие при загрузке, если в URL уже есть #modal-...
    openModalByHash(window.location.hash);

    // Реакция на смену hash
    window.addEventListener('hashchange', function () {
      openModalByHash(window.location.hash);
    });

    // Клик по оверлею — закрыть
    modals.forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) { closeAllModals(); cleanHash(); }
      });
    });

    // Кнопка «×» — закрыть
    document.querySelectorAll('.modal__close').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        closeAllModals();
        cleanHash();
      });
    });

    // Esc — закрыть
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAllModals(); cleanHash(); }
    });

    // Закрытие мобильного меню при клике по ссылке
    document.querySelectorAll('.site-nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        var toggle = document.getElementById('burger-toggle');
        if (toggle) toggle.checked = false;
      });
    });
  });
})();