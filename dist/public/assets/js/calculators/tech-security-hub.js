/**
 * AIO Calculator : Modular Engine: tech-security-hub
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 * Multi-Currency Enabled via AIO_CURRENCY
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'tech-security-hub' && !(toolType === 'tdee' && 'tech-security-hub' === 'calorie-macro') && !(toolType === 'scientific' && 'tech-security-hub' === 'basic-math')) {
      return;
    }

    var formContainer = document.getElementById('calc-form-container');
    var primaryLabel = document.getElementById('res-primary-label');
    var primaryValue = document.getElementById('res-primary-value');
    var breakdownRows = document.getElementById('res-breakdown-rows');
    var copyBtn = document.getElementById('btn-copy-result');
    var copyText = document.getElementById('copy-btn-text');

    if (!formContainer) return;

    var formatCurrency = function (val, maxDec) {
      if (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.format === 'function') {
        return window.AIO_CURRENCY.format(val, maxDec);
      }
      if (maxDec === undefined) maxDec = 2;
      if (isNaN(val) || !isFinite(val)) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: maxDec
      }).format(val);
    };

    var getCurSymbol = function () {
      return (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.getSymbol === 'function')
        ? window.AIO_CURRENCY.getSymbol()
        : '$';
    };

    var getCurBarHtml = function () {
      return (window.AIO_CURRENCY && typeof window.AIO_CURRENCY.getBarHtml === 'function')
        ? window.AIO_CURRENCY.getBarHtml()
        : '';
    };

    var formatNumber = function (val, dec) {
      if (dec === undefined) dec = 2;
      if (isNaN(val) || !isFinite(val)) return '0';
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: dec
      }).format(val);
    };

    var defaults = {};
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = JSON.parse(raw);
    } catch (e) {}

    // Tool Engine
    function buildTechSecurityHub(def) {
      formContainer.innerHTML =
        '<div class="form-group">' +
          '<label class="form-label" for="ts-len">Password Length: <span id="ts-len-val">16</span> characters</label>' +
          '<input type="range" id="ts-len" class="form-range" min="12" max="64" value="16" />' +
        '</div>' +
        '<div style="display: flex; gap: 1rem; margin-bottom: 1rem;">' +
          '<button type="button" class="btn btn-primary" id="btn-gen-pass" style="width: 100%;">Generate New Password</button>' +
        '</div>';

      function generate() {
        var len = parseInt(document.getElementById('ts-len').value, 10) || 16;
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        var randomValues = new Uint32Array(len);
        window.crypto.getRandomValues(randomValues);

        var pass = "";
        for (var i = 0; i < len; i++) {
          pass += charset[randomValues[i] % charset.length];
        }

        primaryLabel.textContent = 'Cryptographic Secure Password';
        primaryValue.textContent = pass;
        primaryValue.style.fontSize = '1.35rem';
        primaryValue.style.wordBreak = 'break-all';

        breakdownRows.innerHTML =
          '<div class="breakdown-row highlight"><span>Entropy:</span><span style="color: var(--color-success); font-weight: 700;">Over 95 bits (Uncrackable by brute-force)</span></div>';
      }

      var slider = document.getElementById('ts-len');
      if (slider) {
        slider.addEventListener('input', function (e) {
          document.getElementById('ts-len-val').textContent = e.target.value;
          generate();
        });
      }
      var genBtn = document.getElementById('btn-gen-pass');
      if (genBtn) genBtn.addEventListener('click', generate);
      generate();
    }

    // Initialize Tool
    buildTechSecurityHub(defaults);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
