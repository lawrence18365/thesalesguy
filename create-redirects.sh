#!/bin/bash

# Create redirect HTML files for old URLs
# GitHub Pages doesn't support server-side redirects, so we use meta refresh + JavaScript

create_redirect() {
    local old_file=$1
    local new_url=$2
    local page_title=$3

    cat > "$old_file" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=$new_url">
    <link rel="canonical" href="https://thesalesguy.com.au$new_url">
    <title>Redirecting to $page_title | The Sales Guy</title>
    <script>
        window.location.href = "$new_url";
    </script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 40px;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 16px;
            color: #00D66B;
        }
        p {
            font-size: 16px;
            opacity: 0.9;
            margin-bottom: 24px;
        }
        a {
            color: #00D66B;
            text-decoration: none;
            font-weight: 600;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Redirecting...</h1>
        <p>If you are not redirected automatically, <a href="$new_url">click here</a>.</p>
    </div>
</body>
</html>
EOF

    echo "  ✓ Created redirect: $old_file → $new_url"
}

echo "📍 Creating redirect files for old URLs..."

# Service pages
create_redirect "sdr.html" "/sdr-sales-training/" "SDR Sales Training"
create_redirect "ae.html" "/account-executive-training/" "Account Executive Training"

# Content pages
create_redirect "about.html" "/about/" "About"
create_redirect "resources.html" "/resources/" "Resources"
create_redirect "blog.html" "/blog/" "Blog"

# Blog posts
create_redirect "blog-4-life-changing-benefits-cold-calling.html" "/blog/cold-calling-benefits/" "Cold Calling Benefits"
create_redirect "blog-overcome-call-reluctance.html" "/blog/overcome-call-reluctance/" "Overcome Call Reluctance"
create_redirect "blog-stop-chasing-vanity-metrics.html" "/blog/stop-chasing-vanity-metrics/" "Stop Chasing Vanity Metrics"

# Legal pages
create_redirect "privacy.html" "/privacy/" "Privacy Policy"
create_redirect "terms.html" "/terms/" "Terms of Service"

echo "✅ All redirect files created!"
