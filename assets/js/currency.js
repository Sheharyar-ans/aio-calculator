/**
 * AIO Calculator — Universal Multi-Currency Engine
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Persists selection via localStorage and synchronizes calculators in real time.
 */
(function () {
  'use strict';

  var CURRENCIES = {
    USD: { symbol: '$', name: 'US Dollar', code: 'USD', locale: 'en-US' },
    EUR: { symbol: '€', name: 'Euro', code: 'EUR', locale: 'de-DE' },
    GBP: { symbol: '£', name: 'British Pound', code: 'GBP', locale: 'en-GB' },
    INR: { symbol: '₹', name: 'Indian Rupee', code: 'INR', locale: 'en-IN' },
    PKR: { symbol: 'Rs', name: 'Pakistani Rupee', code: 'PKR', locale: 'en-PK' },
    AED: { symbol: 'AED', name: 'UAE Dirham', code: 'AED', locale: 'en-AE' },
    SAR: { symbol: 'SAR', name: 'Saudi Riyal', code: 'SAR', locale: 'en-SA' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD', locale: 'en-CA' },
    AUD: { symbol: 'A$', name: 'Australian Dollar', code: 'AUD', locale: 'en-AU' },
    JPY: { symbol: '¥', name: 'Japanese Yen', code: 'JPY', locale: 'ja-JP' },
    CNY: { symbol: '¥', name: 'Chinese Yuan', code: 'CNY', locale: 'zh-CN' },
    CHF: { symbol: 'CHF', name: 'Swiss Franc', code: 'CHF', locale: 'de-CH' },
    BRL: { symbol: 'R$', name: 'Brazilian Real', code: 'BRL', locale: 'pt-BR' },
    TRY: { symbol: '₺', name: 'Turkish Lira', code: 'TRY', locale: 'tr-TR' },
    ZAR: { symbol: 'R', name: 'South African Rand', code: 'ZAR', locale: 'en-ZA' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar', code: 'SGD', locale: 'en-SG' },
    NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', code: 'NZD', locale: 'en-NZ' },
    MYR: { symbol: 'RM', name: 'Malaysian Ringgit', code: 'MYR', locale: 'ms-MY' },
    PHP: { symbol: '₱', name: 'Philippine Peso', code: 'PHP', locale: 'en-PH' },
    BDT: { symbol: '৳', name: 'Bangladeshi Taka', code: 'BDT', locale: 'bn-BD' },
    NGN: { symbol: '₦', name: 'Nigerian Naira', code: 'NGN', locale: 'en-NG' }
  };

  var STORAGE_KEY = 'aio_selected_currency';
  var DEFAULT_CODE = 'USD';
  var currentCode = DEFAULT_CODE;

  function getStoredCurrency() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && CURRENCIES[stored]) {
        currentCode = stored;
        return stored;
      }
    } catch (e) {}
    return currentCode || DEFAULT_CODE;
  }

  function getCurrency(code) {
    var c = code || getStoredCurrency();
    return CURRENCIES[c] || CURRENCIES.USD;
  }

  function getSymbol(code) {
    return getCurrency(code).symbol;
  }

  function formatCurrency(val, maxDec, overrideCode) {
    if (maxDec === undefined) maxDec = 2;
    var code = overrideCode || getStoredCurrency();
    var curr = getCurrency(code);

    if (isNaN(val) || !isFinite(val)) {
      return curr.symbol + (maxDec > 0 ? '0.00' : '0');
    }

    try {
      // Use standard Intl formatting
      return new Intl.NumberFormat(curr.locale, {
        style: 'currency',
        currency: code,
        maximumFractionDigits: maxDec,
        minimumFractionDigits: maxDec
      }).format(val);
    } catch (e) {
      // Robust fallback for environments without complete locale currency tables
      var formatted = Number(val).toLocaleString('en-US', {
        minimumFractionDigits: maxDec,
        maximumFractionDigits: maxDec
      });
      return curr.symbol + ' ' + formatted;
    }
  }

  function setCurrency(code) {
    if (!CURRENCIES[code]) return;
    currentCode = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {}

    // Synchronize all dropdowns and pill buttons on current page
    syncControls(code);

    // Update input prefixes and labels in active forms
    updateFormElements(code);

    // Fire global event for active calculator recalculation
    window.dispatchEvent(new CustomEvent('aioCurrencyChange', {
      detail: {
        code: code,
        symbol: CURRENCIES[code].symbol,
        currency: CURRENCIES[code]
      }
    }));
  }

  function syncControls(code) {
    var current = code || getStoredCurrency();

    // Sync header dropdowns
    var headerSelects = document.querySelectorAll('.header-currency-select, #global-currency-select');
    for (var i = 0; i < headerSelects.length; i++) {
      if (headerSelects[i].value !== current) {
        headerSelects[i].value = current;
      }
    }

    // Sync calculator widget dropdowns
    var calcSelects = document.querySelectorAll('.calc-currency-select, .calc-currency-dropdown');
    for (var j = 0; j < calcSelects.length; j++) {
      calcSelects[j].value = current;
    }

    // Sync pill buttons
    var pills = document.querySelectorAll('.curr-pill');
    for (var k = 0; k < pills.length; k++) {
      var pillCurr = pills[k].getAttribute('data-curr');
      if (pillCurr === current) {
        pills[k].classList.add('active');
      } else {
        pills[k].classList.remove('active');
      }
    }
  }

  function updateFormElements(code) {
    var sym = getSymbol(code);

    // Update input prefixes
    var prefixes = document.querySelectorAll('.input-prefix, [data-currency-prefix]');
    for (var i = 0; i < prefixes.length; i++) {
      prefixes[i].textContent = sym;
    }

    // Update form labels containing currency indicator
    var labels = document.querySelectorAll('.form-label');
    for (var j = 0; j < labels.length; j++) {
      var txt = labels[j].textContent;
      if (/\([$€£₹\w]+\)/.test(txt)) {
        labels[j].textContent = txt.replace(/\([$€£₹\w]+\)/, '(' + sym + ')');
      }
    }
  }

  function getCurrencyBarHtml() {
    var cur = getStoredCurrency();
    var quickCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'PKR'];
    
    var pillsHtml = '';
    for (var i = 0; i < quickCurrencies.length; i++) {
      var q = quickCurrencies[i];
      var activeClass = (q === cur) ? ' active' : '';
      var sym = CURRENCIES[q].symbol;
      pillsHtml += '<button type="button" class="curr-pill' + activeClass + '" data-curr="' + q + '">' + sym + ' ' + q + '</button>';
    }

    var optionsHtml = '<option value="">More Currencies...</option>';
    var allKeys = Object.keys(CURRENCIES);
    for (var j = 0; j < allKeys.length; j++) {
      var key = allKeys[j];
      var isSelected = (key === cur) ? ' selected' : '';
      optionsHtml += '<option value="' + key + '"' + isSelected + '>' + key + ' (' + CURRENCIES[key].symbol + ') : ' + CURRENCIES[key].name + '</option>';
    }

    return (
      '<div class="calc-currency-bar" data-currency-bar="true">' +
        '<div class="calc-currency-bar-left">' +
          '<svg class="currency-globe-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line>' +
            '<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>' +
          '</svg>' +
          '<span class="calc-currency-label">Currency:</span>' +
        '</div>' +
        '<div class="calc-currency-bar-right">' +
          '<div class="calc-currency-pills">' + pillsHtml + '</div>' +
          '<select class="calc-currency-select" aria-label="Select more currencies">' + optionsHtml + '</select>' +
        '</div>' +
      '</div>'
    );
  }

  function bindCurrencyBar(container, onRecalc) {
    if (!container) return;
    
    // Bind pill buttons
    var pills = container.querySelectorAll('.curr-pill');
    for (var i = 0; i < pills.length; i++) {
      pills[i].addEventListener('click', function (e) {
        e.preventDefault();
        var code = this.getAttribute('data-curr');
        if (code) {
          setCurrency(code);
          if (typeof onRecalc === 'function') onRecalc();
        }
      });
    }

    // Bind dropdown
    var select = container.querySelector('.calc-currency-select');
    if (select) {
      select.addEventListener('change', function () {
        if (this.value) {
          setCurrency(this.value);
          if (typeof onRecalc === 'function') onRecalc();
        }
      });
    }
  }

  function init() {
    var cur = getStoredCurrency();

    // Bind header global dropdown
    var globalSelect = document.getElementById('global-currency-select');
    if (globalSelect) {
      globalSelect.value = cur;
      globalSelect.addEventListener('change', function () {
        setCurrency(this.value);
      });
    }

    syncControls(cur);
    updateFormElements(cur);
  }

  // Export to window
  window.AIO_CURRENCY = {
    currencies: CURRENCIES,
    getCurrent: getStoredCurrency,
    setCurrent: setCurrency,
    format: formatCurrency,
    getSymbol: getSymbol,
    getBarHtml: getCurrencyBarHtml,
    bindBar: bindCurrencyBar,
    updateForms: updateFormElements,
    sync: syncControls,
    init: init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
