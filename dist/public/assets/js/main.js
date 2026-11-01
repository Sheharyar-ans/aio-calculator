/**
 * AIO Calculator — Main Client Runtime
 * 100% Client-Side, Self-Contained, Zero External Dependencies
 */

(function () {
  'use strict';

  // 1. Dynamic Current Year in Footer
  document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Client-Side Global Search Engine
    var searchModal = document.getElementById('search-modal');
    var searchTrigger = document.getElementById('search-trigger-btn');
    var searchClose = document.getElementById('search-close-btn');
    var searchInput = document.getElementById('global-search-input');
    var resultsBox = document.getElementById('search-results-box');

    var searchData = [];
    var searchDataLoaded = false;

    function loadSearchData(cb) {
      if (searchDataLoaded && searchData.length > 0) {
        if (cb) cb();
        return;
      }
      fetch('/assets/search-index.json')
        .then(function (res) {
          if (!res.ok) throw new Error('Search index not found');
          return res.json();
        })
        .then(function (data) {
          searchData = data;
          searchDataLoaded = true;
          if (cb) cb();
        })
        .catch(function () {
          // Fallback if fetch is blocked or file not yet loaded
          if (window.__AIO_SEARCH_INDEX__) {
            searchData = window.__AIO_SEARCH_INDEX__;
            searchDataLoaded = true;
            if (cb) cb();
          }
        });
    }

    function openSearch() {
      if (!searchModal) return;
      searchModal.classList.add('open');
      if (searchInput) searchInput.focus();
      loadSearchData(function () {
        renderSearchResults(searchInput ? searchInput.value : '');
      });
    }

    function closeSearch() {
      if (!searchModal) return;
      searchModal.classList.remove('open');
    }

    if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    if (searchModal) {
      searchModal.addEventListener('click', function (e) {
        if (e.target === searchModal) closeSearch();
      });
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchModal && searchModal.classList.contains('open')) {
        closeSearch();
      }
    });

    function renderSearchResults(query) {
      if (!resultsBox) return;
      var q = (query || '').toLowerCase().trim();
      var list = searchData;

      var filtered = q
        ? list.filter(function (item) {
            var name = (item.name || '').toLowerCase();
            var desc = (item.desc || '').toLowerCase();
            var cat = (item.cat || item.category || '').toLowerCase();
            var kw = (item.keywords || []).join(' ').toLowerCase();
            return name.indexOf(q) !== -1 || desc.indexOf(q) !== -1 || cat.indexOf(q) !== -1 || kw.indexOf(q) !== -1;
          })
        : list.slice(0, 8);

      if (filtered.length === 0) {
        resultsBox.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--color-slate-500);">No calculators found matching your search. Try searching for "mortgage", "calorie", "GPA", or "tax".</div>';
        return;
      }

      resultsBox.innerHTML = filtered.map(function (item) {
        var catName = item.cat || item.category || 'Tool';
        return (
          '<a href="/' + item.slug + '/" class="search-result-item">' +
            '<div class="search-result-title">' +
              '<span>' + item.name + '</span>' +
              '<span class="search-result-cat">' + catName + '</span>' +
            '</div>' +
            '<div class="search-result-desc">' + (item.desc || '') + '</div>' +
          '</a>'
        );
      }).join('');
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        renderSearchResults(e.target.value);
      });
    }

    // Pre-fetch search data on idle
    if (window.requestIdleCallback) {
      window.requestIdleCallback(function () {
        loadSearchData();
      });
    } else {
      setTimeout(loadSearchData, 2000);
    }

    // 3. Contact Form Client-Side Validation & Mailto Fallback
    var contactForm = document.getElementById('aio-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = (document.getElementById('contact-name') || {}).value || '';
        var email = (document.getElementById('contact-email') || {}).value || '';
        var subject = (document.getElementById('contact-subject') || {}).value || 'Inquiry';
        var message = (document.getElementById('contact-message') || {}).value || '';
        var statusEl = document.getElementById('contact-form-status');

        if (!name.trim() || !email.trim() || !message.trim()) {
          if (statusEl) {
            statusEl.innerHTML = '<div class="alert-box alert-warning">Please fill out all required fields.</div>';
          }
          return;
        }

        // Construct mailto link
        var mailtoSubject = encodeURIComponent('[AIO Calculator ' + subject + '] from ' + name);
        var mailtoBody = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
        var mailtoUrl = 'mailto:support@aio-calculator.com?subject=' + mailtoSubject + '&body=' + mailtoBody;

        if (statusEl) {
          statusEl.innerHTML = (
            '<div class="alert-box alert-info" style="margin-top: 1rem;">' +
              '<strong>Opening Your Email App...</strong><br />' +
              'Because AIO Calculator operates 100% statically without server-side databases, your message is transferred to your local mail client to send directly to <code>support@aio-calculator.com</code>.<br />' +
              '<a href="' + mailtoUrl + '" class="btn btn-primary btn-sm" style="margin-top: 0.5rem; text-decoration: none; color: #fff;">Click Here if Email Did Not Open Automatically</a>' +
            '</div>'
          );
        }

        // Trigger mailto client
        window.location.href = mailtoUrl;
      });
    }
  });
})();
