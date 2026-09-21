document.addEventListener('DOMContentLoaded', function () {

  /* Mobile menu */
  var toggle = document.getElementById('menuToggle');
  var panel = document.getElementById('mobilePanel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.toggle('open');
      var open = panel.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });
  }

  /* Accordions */
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panelEl = btn.nextElementSibling;
      var isOpen = panelEl.classList.contains('open');
      panelEl.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  /* Single-select pill / option groups: [data-group] on a container, .give-option or .amount-pill children */
  document.querySelectorAll('[data-select-group]').forEach(function (group) {
    var items = group.querySelectorAll('[data-select-item]');
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        items.forEach(function (i) { i.classList.remove('selected'); });
        item.classList.add('selected');
        var customField = group.parentElement.querySelector('[data-custom-amount]');
        if (customField) {
          customField.style.display = item.getAttribute('data-custom') === 'true' ? 'block' : 'none';
        }
      });
    });
  });

  /* Event detail toggles: [data-event-trigger="id"] shows [data-event-detail="id"] */
  document.querySelectorAll('[data-event-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-event-trigger');
      document.querySelectorAll('.event-detail').forEach(function (d) { d.classList.remove('open'); });
      var target = document.querySelector('[data-event-detail="' + id + '"]');
      if (target) {
        target.classList.add('open');
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  document.querySelectorAll('[data-event-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.event-detail').classList.remove('open');
    });
  });

  /* Demo form handling: any form with data-demo-form */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field') || input.parentElement;
        if (!input.value || (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value))) {
          valid = false;
          field.classList.add('invalid');
        } else {
          field.classList.remove('invalid');
        }
      });
      if (!valid) return;
      var success = form.parentElement.querySelector('.form-success') || document.querySelector('#' + form.getAttribute('data-success-target'));
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });
  });

  /* Demo giving button */
  var giveBtn = document.getElementById('giveDemoBtn');
  if (giveBtn) {
    giveBtn.addEventListener('click', function () {
      var success = document.getElementById('giveSuccess');
      if (success) success.classList.add('show');
      giveBtn.textContent = 'Demo payment received';
    });
  }

});
