#!/bin/bash

# Remove hardcoded Google Analytics 4 from all HTML files
# GA4 should ONLY be loaded through GTM, not directly in HTML

echo "🔧 Removing hardcoded GA4 scripts from all pages..."
echo ""

FILES=(
  "index.html"
  "sdr-sales-training/index.html"
  "account-executive-training/index.html"
  "about/index.html"
  "resources/index.html"
  "blog/index.html"
  "blog/cold-calling-benefits/index.html"
  "blog/overcome-call-reluctance/index.html"
  "blog/stop-chasing-vanity-metrics/index.html"
  "privacy/index.html"
  "terms/index.html"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Remove the GA4 script tag and the inline config
    # This removes lines 12-20 which contain:
    # <!-- Google tag (gtag.js) -->
    # <script async src="https://www.googletagmanager.com/gtag/js?id=G-08HPNCHLSP"></script>
    # <script>
    #   window.dataLayer = window.dataLayer || [];
    #   function gtag(){dataLayer.push(arguments);}
    #   gtag('js', new Date());
    #   gtag('config', 'G-08HPNCHLSP');
    # </script>

    # Use sed to remove the GA4 section (between "Google tag (gtag.js)" and the closing script tag)
    sed -i '/<!-- Google tag (gtag.js) -->/,/<\/script>/d' "$file"

    # Also remove the async script line if it's separate
    sed -i '/gtag\/js?id=G-08HPNCHLSP/d' "$file"

    echo "  ✓ Cleaned: $file"
  else
    echo "  ✗ Not found: $file"
  fi
done

echo ""
echo "✅ Done! GA4 will now ONLY load through GTM."
echo ""
echo "Next: Add GA4 as a tag in GTM:"
echo "  Tag Type: Google Analytics: GA4 Configuration"
echo "  Measurement ID: G-08HPNCHLSP"
echo "  Trigger: All Pages"
