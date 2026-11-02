import fs from 'fs';

const cssAddition = `
/* ==========================================================================
   Header Layout Stabilization & Footer Multi-Currency Widget
   ========================================================================== */
.header-inner {
  flex-wrap: nowrap;
}

.brand-link {
  white-space: nowrap;
  flex-shrink: 0;
}

.brand-link span {
  white-space: nowrap;
}

.nav-desktop {
  white-space: nowrap;
  flex-shrink: 1;
}

.header-actions .header-currency-wrapper {
  display: none !important;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
  }
}

.footer-currency-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background-color: var(--color-slate-800);
  border: 1px solid var(--color-slate-700);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.65rem;
  transition: all 0.15s ease;
  margin-left: auto;
}

.footer-currency-wrapper:hover,
.footer-currency-wrapper:focus-within {
  border-color: var(--color-primary);
  background-color: var(--color-slate-900);
}

.footer-currency-wrapper .currency-globe-icon {
  color: #60a5fa;
  flex-shrink: 0;
}

.footer-currency-select {
  border: none;
  background: transparent;
  color: var(--color-slate-200);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  font-family: inherit;
}

.footer-currency-select option {
  background-color: var(--color-slate-900);
  color: var(--color-slate-100);
}
`;

['assets/css/main.css', 'dist/assets/css/main.css'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('Header Layout Stabilization')) {
    content += '\n' + cssAddition;
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Appended header/footer CSS to ${file}`);
  }
});
