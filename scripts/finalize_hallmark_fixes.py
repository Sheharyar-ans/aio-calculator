import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update <style> block to start with Capitalized /* Hallmark:
old_style_marker = "/* hallmark: material: modern-minimal;"
new_style_marker = "/* Hallmark: material: modern-minimal;"
html = html.replace(old_style_marker, new_style_marker)

# 2. Fix .direct-answer-lead border-left (Rule 3)
html = re.sub(
    r'\.direct-answer-lead\s*\{[^}]*\}',
    '.direct-answer-lead { font-size: 1.05rem; line-height: 1.6; color: var(--color-slate-800); margin-bottom: 1.5rem; border: 1px solid var(--color-slate-200); border-radius: var(--radius-md); background: var(--color-white); padding: 1rem 1.25rem; box-shadow: var(--shadow-sm); }',
    html
)

# 3. Fix percentage calculator heading (Rule 67 & 38iii: no uppercase, no accented span inside heading)
html = re.sub(
    r'<h3[^>]*><a href="/percentage-calculator/"[^>]*>[^<]*</a>\s*<span class="badge-upgraded">[^<]*</span></h3>',
    '<h3 class="guide-article-title"><a href="/percentage-calculator/" class="guide-title-link">Percentage Calculator</a></h3>',
    html
)

# 4. Remove .badge-upgraded css rule
html = re.sub(r'\.badge-upgraded\s*\{[^}]*\}', '', html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Applied strict Hallmark fixes to index.html")
