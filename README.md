# The Sales Guy - B2B Sales Training Website

**Expert cold calling and sales training for SDR and AE teams across Australia and worldwide.**

---

## 📋 Project Overview

This is the official website for The Sales Guy, a B2B sales training consultancy founded by Lee Marshall. The site provides information about sales training services, resources, and a blog with sales insights.

**Live URL:** https://thesalesguy.com.au

---

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - ES6+, Intersection Observer API
- **Formspree.io** - Contact form processing
- **Google Fonts** - Inter typeface
- **Font Awesome** - Icons

---

## 📁 Project Structure

```
thesalesguy/
├── index.html              # Homepage
├── sdr.html                # SDR training page
├── ae.html                 # AE training page
├── about.html              # About Lee Marshall
├── blog.html               # Blog listing page
├── blog-*.html             # Individual blog articles (3)
├── resources.html          # Resources page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── robots.txt              # Search engine crawling rules
├── sitemap.xml             # Sitemap for SEO
├── css/
│   └── styles.css          # Main stylesheet (1,433 lines)
├── js/
│   └── main.js             # Main JavaScript file (260 lines)
└── components/
    ├── header.html         # Header component (not in use)
    └── footer.html         # Footer component (not in use)
```

---

## 🛠️ Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Running Locally

**Option 1: Simple File Open**
```bash
# Just open index.html in your browser
open index.html
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with http-server)
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### Why Use a Local Server?

- Proper CORS handling for fonts and external resources
- Accurate testing of relative URLs
- Better simulation of production environment

---

## 📝 Making Content Updates

### Update Phone Number

The phone number `0478 409 161` appears in multiple files. Use find-and-replace:

```bash
# Find all instances
grep -r "0478 409 161" .

# Replace across all HTML files (use with caution)
find . -name "*.html" -exec sed -i '' 's/0478 409 161/NEW_NUMBER/g' {} +
```

### Update Email Address

The email `lee@thesalesguy.com.au` appears in multiple files:

```bash
grep -r "lee@thesalesguy.com.au" .
```

### Add New Blog Article

1. Copy an existing blog article (e.g., `blog-4-life-changing-benefits-cold-calling.html`)
2. Rename it to `blog-your-new-title.html`
3. Update the content inside
4. Add a link in `blog.html`
5. Update `sitemap.xml` with the new URL

---

## 🔗 Connect Contact Form

The contact form currently has a placeholder. To connect it:

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form and get your form ID (e.g., `xwpkeyzg`)
3. Replace `YOUR_FORM_ID` in all HTML files:

```bash
# Find all instances
grep -r "YOUR_FORM_ID" .

# Replace (example)
find . -name "*.html" -exec sed -i '' 's/YOUR_FORM_ID/xwpkeyzg/g' {} +
```

Or manually update in these files:
- index.html
- sdr.html
- ae.html
- about.html
- blog.html
- blog-*.html (3 files)
- resources.html

---

## 🎨 Styling Guidelines

### Color Palette

```css
--primary-color: #00D66B;     /* Bright green */
--primary-dark: #00A854;      /* Darker green */
--secondary-color: #0a0a0a;   /* Near black */
--accent-green: #00FF7F;      /* Neon green */
--bg-light: #f8f8f8;          /* Off-white */
```

### Typography

- **Font Family:** Inter (Google Fonts)
- **Weights:** 400, 600, 700, 800, 900
- **Headings:** 900 weight, -1.5px letter-spacing
- **Body:** 400 weight, 1.6 line-height

### Responsive Breakpoints

```css
@media (max-width: 968px) { /* Tablet */ }
@media (max-width: 640px) { /* Mobile */ }
```

---

## ♿ Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA attributes (aria-expanded, aria-label)
- ✅ Keyboard navigation support
- ✅ Skip link for screen readers
- ✅ Focus styles on interactive elements
- ✅ Proper form labels
- ✅ Color contrast (WCAG AA compliant)

---

## 🔍 SEO Features

- ✅ Meta descriptions on all pages
- ✅ Canonical URLs
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Schema.org structured data (LocalBusiness/ProfessionalService)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design

---

## 🚀 Deployment

This is a static site that can be deployed to any hosting provider:

### Recommended Hosts

1. **Netlify** (Recommended)
   - Free tier available
   - Automatic HTTPS
   - Form handling built-in (alternative to Formspree)
   - Deploy via Git

2. **Vercel**
   - Free tier available
   - Excellent performance
   - Git-based deployment

3. **GitHub Pages**
   - Free for public repos
   - Easy Git integration

4. **Traditional Hosting** (cPanel, FTP)
   - Upload all files to public_html or www directory
   - Ensure .htaccess is configured for clean URLs

### Deployment Checklist

- [ ] Replace `YOUR_FORM_ID` with actual Formspree ID
- [ ] Update `sitemap.xml` with correct domain
- [ ] Update `robots.txt` with correct sitemap URL
- [ ] Test all forms
- [ ] Test all internal links
- [ ] Verify mobile responsiveness
- [ ] Check page load speeds
- [ ] Set up Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console

---

## 📊 Performance Optimization

### Current Status
- **Total Size:** ~855KB
- **CSS:** 27KB (unminified)
- **JS:** 8.5KB (unminified)
- **HTML:** ~250KB total across all pages

### Recommended Optimizations
1. Minify CSS and JavaScript
2. Compress images (WebP format)
3. Enable Gzip/Brotli compression on server
4. Add caching headers
5. Lazy load images
6. Consider moving to a build process (Vite/Webpack)

---

## 🔐 Security Recommendations

### Server Configuration

Add these headers via `.htaccess` or server config:

```apache
# .htaccess example
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

### HTTPS

Always use HTTPS in production. Most modern hosts provide free SSL via Let's Encrypt.

---

## 🐛 Known Issues & Limitations

1. **Code Duplication:** Header and footer are duplicated across all 13 HTML files. Any change requires updating all files.
2. **No Build Process:** CSS and JS are not minified for production.
3. **Manual Updates:** Content changes require manual HTML editing.
4. **No CMS:** No content management system for easy updates.

### Future Improvements

- [ ] Migrate to modern framework (Astro, Next.js, or Vite)
- [ ] Implement component system to eliminate duplication
- [ ] Add build process for minification and optimization
- [ ] Add automated testing
- [ ] Consider headless CMS for blog content
- [ ] Add image optimization pipeline

---

## 📞 Contact & Support

**Website Owner:** Lee Marshall
**Email:** lee@thesalesguy.com.au
**Phone:** 0478 409 161
**LinkedIn:** [Lee Marshall](https://www.linkedin.com/in/lee-marshall-823561130)

---

## 📄 License

© 2025 The Sales Guy. All rights reserved.

---

## 🤝 Contributing

This is a private business website. For bugs or suggestions, contact Lee Marshall directly.

---

## 📚 Additional Resources

- [Formspree Documentation](https://help.formspree.io/)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WAVE Accessibility Checker](https://wave.webaim.org/)

---

**Last Updated:** January 2025
**Version:** 1.0
