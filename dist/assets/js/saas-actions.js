/**
 * AIO Calculator : SaaS Action Bar, URL Query Presets & Embed Widget Controller
 * 100% Client-Side Vanilla JavaScript
 * Zero Server Dependencies, Zero Tracking
 */
(function () {
  'use strict';

  function initSaasActions() {
    var formContainer = document.getElementById('calc-form-container');
    if (!formContainer) return;

    // 1. Process URL Query Presets on Load
    if (window.location.search) {
      try {
        var params = new URLSearchParams(window.location.search);
        var inputs = formContainer.querySelectorAll('input, select');
        var modified = false;
        inputs.forEach(function (inp) {
          var id = inp.id;
          var key = id.replace(/^[a-z]+-/, ''); // strip prefix if any
          if (params.has(id)) {
            inp.value = params.get(id);
            modified = true;
          } else if (params.has(key)) {
            inp.value = params.get(key);
            modified = true;
          }
        });
        if (modified) {
          var firstInp = inputs[0];
          if (firstInp) {
            firstInp.dispatchEvent(new Event('input', { bubbles: true }));
            firstInp.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      } catch (e) {}
    }

    // 2. Shareable Link Generator
    var shareBtn = document.getElementById('btn-share-link');
    if (shareBtn) {
      shareBtn.addEventListener('click', function () {
        try {
          var params = new URLSearchParams();
          var inputs = formContainer.querySelectorAll('input, select');
          inputs.forEach(function (inp) {
            if (inp.id && inp.value !== '') {
              params.set(inp.id, inp.value);
            }
          });
          var shareUrl = window.location.origin + window.location.pathname + '?' + params.toString();
          navigator.clipboard.writeText(shareUrl).then(function () {
            var origText = shareBtn.innerHTML;
            shareBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Link Copied!';
            setTimeout(function () {
              shareBtn.innerHTML = origText;
            }, 2500);
          }).catch(function () {
            prompt('Copy this shareable calculator link:', shareUrl);
          });
        } catch (e) {}
      });
    }

    // 3. Reset Button
    var resetBtn = document.getElementById('btn-reset-calc');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var calcRoot = document.getElementById('calculator-root');
        var defaults = {};
        if (calcRoot) {
          try {
            var raw = calcRoot.getAttribute('data-defaults');
            if (raw) defaults = JSON.parse(raw);
          } catch (e) {}
        }
        var inputs = formContainer.querySelectorAll('input, select');
        inputs.forEach(function (inp) {
          var id = inp.id;
          var key = id.replace(/^[a-z]+-/, '');
          if (defaults[id] !== undefined) {
            inp.value = defaults[id];
          } else if (defaults[key] !== undefined) {
            inp.value = defaults[key];
          } else if (inp.defaultValue !== undefined && inp.defaultValue !== '') {
            inp.value = inp.defaultValue;
          }
        });
        if (inputs.length > 0) {
          inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
          inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }

    // 4. Export / Print PDF Button
    var printBtn = document.getElementById('btn-print-summary');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    // 5. Embed Modal / Code Box Toggle
    var embedBtn = document.getElementById('btn-toggle-embed');
    var embedBox = document.getElementById('embed-widget-box');
    var embedTextarea = document.getElementById('embed-snippet-text');
    var copyEmbedBtn = document.getElementById('btn-copy-embed');

    if (embedBtn && embedBox) {
      embedBtn.addEventListener('click', function () {
        embedBox.classList.toggle('active');
        if (embedBox.classList.contains('active') && embedTextarea) {
          var toolUrl = window.location.origin + window.location.pathname;
          var snippet = '<iframe src="' + toolUrl + '" width="100%" height="520" frameborder="0" style="border-radius:8px;border:1px solid #e2e8f0;"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:6px;">Calculated using <a href="' + toolUrl + '" target="_blank" rel="noopener">AIO Calculator</a></p>';
          embedTextarea.value = snippet;
        }
      });
    }

    if (copyEmbedBtn && embedTextarea) {
      copyEmbedBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(embedTextarea.value).then(function () {
          var origText = copyEmbedBtn.textContent;
          copyEmbedBtn.textContent = 'Copied Snippet!';
          setTimeout(function () {
            copyEmbedBtn.textContent = origText;
          }, 2500);
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSaasActions);
  } else {
    initSaasActions();
  }
})();
