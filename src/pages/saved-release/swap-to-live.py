import re

content = open('src/App.jsx', 'r').read()

# 1. Add imports for new pages
if "import Landing from './pages/saved-release/Landing'" not in content:
    content = content.replace(
        "import WaitlistLanding from './pages/WaitlistLanding';",
        "import WaitlistLanding from './pages/WaitlistLanding';\nimport Landing from './pages/saved-release/Landing';\nimport AboutPage from './pages/saved-release/About';\nimport PricingPageNew from './pages/saved-release/Pricing';"
    )
    print("1. Added new page imports")

# 2. Replace WaitlistLanding with Landing on the / route
content = content.replace(
    'element={<WaitlistLanding />}',
    'element={<Landing />}'
)
print("2. Root route now uses new Landing page")

# 3. Replace About page route if it exists
if "element={<About />}" in content:
    content = content.replace(
        'element={<About />}',
        'element={<AboutPage />}'
    )
    print("3. About route updated")
else:
    # Add about route
    content = content.replace(
        '<Route path="/privacy"',
        '<Route path="/about" element={<AboutPage />} />\n              <Route path="/privacy"'
    )
    print("3. About route added")

# 4. Replace Pricing page route if it exists  
if "element={<Pricing />}" in content:
    content = content.replace(
        'element={<Pricing />}',
        'element={<PricingPageNew />}'
    )
    print("4. Pricing route updated")

open('src/App.jsx', 'w').write(content)
print("\n✅ LIVE. Push to deploy.")
