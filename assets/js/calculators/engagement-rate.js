/**
 * AIO Calculator : Modular Engine: engagement-rate
 * 100% Client-Side Vanilla JavaScript (Zero Server Runtime, Pure Static)
 */
(function () {
  'use strict';

  function init() {
    var calcRoot = document.getElementById('calculator-root');
    if (!calcRoot) return;

    var toolType = calcRoot.getAttribute('data-tool-type');
    if (toolType !== 'engagement-rate') return;

    var formContainer = document.getElementById('calc-form-container');
    var primaryLabel = document.getElementById('res-primary-label');
    var primaryValue = document.getElementById('res-primary-value');
    var breakdownRows = document.getElementById('res-breakdown-rows');

    if (!formContainer) return;

    var defaults = { followers: 20000, posts: 5, likes: 2400, comments: 180, shares: 320 };
    try {
      var raw = calcRoot.getAttribute('data-defaults');
      if (raw) defaults = Object.assign(defaults, JSON.parse(raw));
    } catch (e) {}

    formContainer.innerHTML =
      '<div class="calc-grid">' +
        '<div class="form-group">' +
          '<label class="form-label" for="er-followers">Total Followers / Audience</label>' +
          '<input type="number" id="er-followers" class="form-input" value="' + defaults.followers + '" min="100" step="500" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="er-posts">Sample Posts Analyzed</label>' +
          '<input type="number" id="er-posts" class="form-input" value="' + defaults.posts + '" min="1" max="50" step="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="er-likes">Total Likes on Sample Posts</label>' +
          '<input type="number" id="er-likes" class="form-input" value="' + defaults.likes + '" min="0" step="100" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="er-comments">Total Comments</label>' +
          '<input type="number" id="er-comments" class="form-input" value="' + defaults.comments + '" min="0" step="10" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label" for="er-shares">Total Shares / Saves</label>' +
          '<input type="number" id="er-shares" class="form-input" value="' + defaults.shares + '" min="0" step="10" />' +
        '</div>' +
      '</div>';

    var followersInp = document.getElementById('er-followers');
    var postsInp = document.getElementById('er-posts');
    var likesInp = document.getElementById('er-likes');
    var commentsInp = document.getElementById('er-comments');
    var sharesInp = document.getElementById('er-shares');

    [followersInp, postsInp, likesInp, commentsInp, sharesInp].forEach(function (inp) {
      inp.addEventListener('input', compute);
    });

    function compute() {
      var followers = Math.max(1, parseFloat(followersInp.value) || 1);
      var posts = Math.max(1, parseFloat(postsInp.value) || 1);
      var likes = parseFloat(likesInp.value) || 0;
      var comments = parseFloat(commentsInp.value) || 0;
      var shares = parseFloat(sharesInp.value) || 0;

      var totalInteractions = likes + comments + shares;
      var avgInteractionsPerPost = totalInteractions / posts;
      var erPercent = (avgInteractionsPerPost / followers) * 100;

      var grade = 'Average';
      var gradeColor = '#2563eb';
      if (erPercent < 1.0) {
        grade = 'Low Engagement (<1.0%)';
        gradeColor = '#dc2626';
      } else if (erPercent <= 3.5) {
        grade = 'Healthy / Good (1.0% to 3.5%)';
        gradeColor = '#16a34a';
      } else if (erPercent <= 6.0) {
        grade = 'High Performance (3.5% to 6.0%)';
        gradeColor = '#2563eb';
      } else {
        grade = 'Viral / Exceptional (>6.0%)';
        gradeColor = '#7c3aed';
      }

      // Sponsored post valuation estimate ($10 to $25 CPM on active engagements)
      var estPostValueLow = Math.max(25, Math.round((followers * (erPercent / 100)) * 0.12));
      var estPostValueHigh = Math.max(50, Math.round((followers * (erPercent / 100)) * 0.28));

      primaryLabel.textContent = 'Engagement Rate Per Post';
      primaryValue.textContent = erPercent.toFixed(2) + '%';

      breakdownRows.innerHTML =
        '<div class="breakdown-row highlight"><span>Performance Benchmark Grade:</span><span style="color:' + gradeColor + '; font-weight:700;">' + grade + '</span></div>' +
        '<div class="breakdown-row"><span>Average Interactions per Post:</span><span>' + Math.round(avgInteractionsPerPost) + ' actions</span></div>' +
        '<div class="breakdown-row"><span>Total Sample Interactions:</span><span>' + totalInteractions + '</span></div>' +
        '<div class="breakdown-row"><span>Estimated Sponsored Post Value:</span><span>$' + estPostValueLow + ' to $' + estPostValueHigh + '</span></div>';
    }

    compute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
