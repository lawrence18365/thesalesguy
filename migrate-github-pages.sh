#!/bin/bash

# GitHub Pages URL Migration Script
# Copies files to new folder structure and updates links

echo "🚀 Starting GitHub Pages migration..."

# Function to update links in a file
update_links() {
    local file=$1
    local css_depth=$2  # "../" or "../../"

    # Update navigation links
    sed -i 's|href="sdr\.html"|href="/sdr-sales-training/"|g' "$file"
    sed -i 's|href="ae\.html"|href="/account-executive-training/"|g' "$file"
    sed -i 's|href="about\.html"|href="/about/"|g' "$file"
    sed -i 's|href="resources\.html"|href="/resources/"|g' "$file"
    sed -i 's|href="blog\.html"|href="/blog/"|g' "$file"
    sed -i 's|href="privacy\.html"|href="/privacy/"|g' "$file"
    sed -i 's|href="terms\.html"|href="/terms/"|g' "$file"

    # Update blog post links
    sed -i 's|href="blog-4-life-changing-benefits-cold-calling\.html"|href="/blog/cold-calling-benefits/"|g' "$file"
    sed -i 's|href="blog-overcome-call-reluctance\.html"|href="/blog/overcome-call-reluctance/"|g' "$file"
    sed -i 's|href="blog-stop-chasing-vanity-metrics\.html"|href="/blog/stop-chasing-vanity-metrics/"|g' "$file"

    # Update canonical URLs
    sed -i 's|https://thesalesguy\.com\.au/sdr\.html|https://thesalesguy.com.au/sdr-sales-training/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/ae\.html|https://thesalesguy.com.au/account-executive-training/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/about\.html|https://thesalesguy.com.au/about/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/resources\.html|https://thesalesguy.com.au/resources/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/blog\.html|https://thesalesguy.com.au/blog/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/privacy\.html|https://thesalesguy.com.au/privacy/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/terms\.html|https://thesalesguy.com.au/terms/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/blog-4-life-changing-benefits-cold-calling\.html|https://thesalesguy.com.au/blog/cold-calling-benefits/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/blog-overcome-call-reluctance\.html|https://thesalesguy.com.au/blog/overcome-call-reluctance/|g' "$file"
    sed -i 's|https://thesalesguy\.com\.au/blog-stop-chasing-vanity-metrics\.html|https://thesalesguy.com.au/blog/stop-chasing-vanity-metrics/|g' "$file"

    # Update CSS/JS paths based on depth
    sed -i "s|href=\"css/|href=\"${css_depth}css/|g" "$file"
    sed -i "s|src=\"js/|src=\"${css_depth}js/|g" "$file"

    echo "  ✓ Updated links in $file"
}

# Copy and update service pages (1 level deep)
echo "📄 Migrating service pages..."
cp sdr.html sdr-sales-training/index.html
update_links "sdr-sales-training/index.html" "../"

cp ae.html account-executive-training/index.html
update_links "account-executive-training/index.html" "../"

# Copy and update content pages (1 level deep)
echo "📄 Migrating content pages..."
cp about.html about/index.html
update_links "about/index.html" "../"

cp resources.html resources/index.html
update_links "resources/index.html" "../"

cp blog.html blog/index.html
update_links "blog/index.html" "../"

# Copy and update legal pages (1 level deep)
echo "📄 Migrating legal pages..."
cp privacy.html privacy/index.html
update_links "privacy/index.html" "../"

cp terms.html terms/index.html
update_links "terms/index.html" "../"

# Copy and update blog posts (2 levels deep)
echo "📝 Migrating blog posts..."
cp blog-4-life-changing-benefits-cold-calling.html blog/cold-calling-benefits/index.html
update_links "blog/cold-calling-benefits/index.html" "../../"

cp blog-overcome-call-reluctance.html blog/overcome-call-reluctance/index.html
update_links "blog/overcome-call-reluctance/index.html" "../../"

cp blog-stop-chasing-vanity-metrics.html blog/stop-chasing-vanity-metrics/index.html
update_links "blog/stop-chasing-vanity-metrics/index.html" "../../"

echo "✅ Migration complete!"
echo ""
echo "Created:"
echo "  /sdr-sales-training/index.html"
echo "  /account-executive-training/index.html"
echo "  /about/index.html"
echo "  /resources/index.html"
echo "  /blog/index.html"
echo "  /blog/cold-calling-benefits/index.html"
echo "  /blog/overcome-call-reluctance/index.html"
echo "  /blog/stop-chasing-vanity-metrics/index.html"
echo "  /privacy/index.html"
echo "  /terms/index.html"
