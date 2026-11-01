import fs from 'fs';

const cssToAdd = `
/* Universal Currency Selector Component */
.header-currency-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--color-slate-100);
  border: 1px solid var(--color-slate-300);
  border-radius: var(--radius-full);
  padding: 0.25rem 0.65rem 0.25rem 0.75rem;
  transition: all 0.15s ease;
  position: relative;
}

.header-currency-wrapper:hover,
.header-currency-wrapper:focus-within {
  border-color: var(--color-primary);
  background-color: #ffffff;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.currency-globe-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.header-currency-select {
  border: none;
  background: transparent;
  color: var(--color-slate-800);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  padding: 0.2rem 0.25rem;
  font-family: inherit;
}

/* Calculator Widget Currency Bar */
.calc-currency-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.calc-currency-bar-left {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
}

.calc-currency-bar-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.calc-currency-pills {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.curr-pill {
  padding: 0.35rem 0.7rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #334155;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 34px;
}

.curr-pill:hover {
  border-color: #2563eb;
  color: #2563eb;
  background: #eff6ff;
}

.curr-pill.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
}

.calc-currency-select {
  padding: 0.35rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #334155;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  min-height: 34px;
  font-family: inherit;
}

.calc-currency-select:hover,
.calc-currency-select:focus {
  border-color: #2563eb;
  background: #ffffff;
}

@media (max-width: 640px) {
  .calc-currency-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .calc-currency-bar-right {
    width: 100%;
    justify-content: flex-start;
  }
}
`;

['./assets/css/main.css', './public/assets/css/main.css'].forEach(p => {
  if (fs.existsSync(p)) {
    fs.appendFileSync(p, cssToAdd);
    console.log('Appended currency CSS to ' + p);
  }
});
