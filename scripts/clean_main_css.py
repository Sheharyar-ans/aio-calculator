import re

with open("assets/css/main.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Replace transition: all
css = css.replace("transition: all 0.15s ease;", "transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;")
css = css.replace("transition: all 0.2s ease;", "transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;")
css = css.replace("transition: all 0.2s;", "transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;")
css = css.replace("transition: all 0.15s;", "transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;")

# 2. Add text-wrap: balance to display heads
css = re.sub(
    r'(h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*)\}',
    r'\1  text-wrap: balance;\n}',
    css
)

# 3. Replace color literals in main.css
css = css.replace("background-color: rgba(255, 255, 255, 0.95);", "background-color: var(--color-white);")
css = css.replace("box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);", "box-shadow: 0 0 0 3px var(--color-primary-light);")
css = css.replace("background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);", "background: linear-gradient(135deg, var(--color-slate-50) 0%, var(--color-primary-light) 100%);")
css = css.replace("border-top: 1px dashed rgba(29, 78, 216, 0.12);", "border-top: 1px dashed var(--color-primary-border);")
css = css.replace("color: #78350f;", "color: var(--color-warning);")
css = css.replace("color: #1e3a8a;", "color: var(--color-primary-hover);")
css = css.replace("background-color: rgba(15, 23, 42, 0.6);", "background-color: rgba(15, 23, 42, 0.7);")
css = css.replace("box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);", "box-shadow: 0 2px 8px var(--color-primary-light);")
css = css.replace("background-color: #f8fafc;", "background-color: var(--color-slate-50);")
css = css.replace("border-bottom: 1px solid #e2e8f0;", "border-bottom: 1px solid var(--color-slate-200);")
css = css.replace("color: #0f172a;", "color: var(--color-slate-900);")
css = css.replace("color: #334155;", "color: var(--color-slate-700);")
css = css.replace("border: 1px solid #cbd5e1;", "border: 1px solid var(--color-slate-300);")
css = css.replace("border-color: #2563eb;", "border-color: var(--color-primary);")
css = css.replace("color: #2563eb;", "color: var(--color-primary);")
css = css.replace("background: #eff6ff;", "background: var(--color-primary-light);")
css = css.replace("background: #2563eb;", "background: var(--color-primary);")
css = css.replace("box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);", "box-shadow: 0 2px 6px var(--color-primary-border);")

# 4. Remove side stripes on callouts
css = re.sub(r'border-left:\s*4px\s*solid\s*var\(--color-primary\);', 'border: 1px solid var(--color-primary-border);', css)
css = re.sub(r'border-left:\s*4px\s*solid\s*var\(--color-warning\);', 'border: 1px solid var(--color-warning-light);', css)

# 5. Fix uppercase tracking on result label
css = css.replace("text-transform: uppercase;\n  letter-spacing: 0.05em;", "text-transform: none;\n  letter-spacing: normal;")

with open("assets/css/main.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Cleaned main.css successfully")
