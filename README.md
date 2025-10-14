# The Sales Guy Website

A bold, modern website for sales training services targeting B2B companies in Australia and worldwide.

## Project Overview

**Business:** The Sales Guy
**Website:** thesalesguy.com.au
**Contact:** lee@thesalesguy.com.au | 0478 409 161

### Purpose
Expert sales training and cold calling coaching for B2B sales teams. Helping SDR teams get on the phone, handle objections, and book meetings that actually show up.

## File Structure

```
salesguy/
├── index.html              # Homepage
├── css/
│   └── styles.css          # All styles (bold, modern design)
├── js/
│   └── main.js             # Interactive functionality
├── components/
│   ├── header.html         # Reusable header navigation
│   └── footer.html         # Reusable footer
└── README.md               # This file
```

## Setup Instructions

### 1. Contact Form Setup (IMPORTANT)

The contact form currently uses Formspree. You need to set this up:

1. Go to [Formspree.io](https://formspree.io/) and create a free account
2. Create a new form and get your form ID
3. Open `index.html` and find line 182
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Formspree will send form submissions to lee@thesalesguy.com.au

**Alternative:** You can also use a mailto link, but this is less reliable:
```html
<form action="mailto:lee@thesalesguy.com.au" method="POST" enctype="text/plain">
```

### 2. Running the Website Locally

Since this uses JavaScript to load components, you need to run a local server (not just open the HTML file):

**Option A: Using Python (Mac/Linux)**
```bash
cd /Users/hayleemandarino/Desktop/salesguy
python3 -m http.server 8000
```
Then open: http://localhost:8000

**Option B: Using PHP**
```bash
cd /Users/hayleemandarino/Desktop/salesguy
php -S localhost:8000
```
Then open: http://localhost:8000

**Option C: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 3. Deploying to the Web

You can host this on any of these platforms:

**Recommended: Netlify (Free)**
1. Go to [netlify.com](https://www.netlify.com/)
2. Drag and drop the entire `salesguy` folder
3. Your site will be live instantly
4. Connect your domain: thesalesguy.com.au

**Alternative: GitHub Pages**
1. Create a GitHub repo
2. Upload all files
3. Enable GitHub Pages in settings
4. Connect custom domain

**Alternative: Traditional Hosting**
- Upload all files via FTP to your hosting provider
- Works with any hosting that supports HTML/CSS/JS

## Pages to Build (Next Steps)

The homepage is complete. You still need to create these pages:

1. **companies.html** - For Companies page
2. **individuals.html** - For Individuals page
3. **library.html** - Blog/Resources page
4. **about.html** - About/Contact page
5. **privacy.html** - Privacy Policy
6. **terms.html** - Terms of Service

### Creating New Pages

To create a new page:

1. Copy `index.html` as a template
2. Keep the header/footer placeholders:
   ```html
   <div id="header-placeholder"></div>
   <!-- Your page content here -->
   <div id="footer-placeholder"></div>
   ```
3. Add your content in between
4. Link the same CSS and JS files
5. Update navigation links in `components/header.html`

## Design Features

### Color Scheme
- **Primary Orange:** #FF4500 (Bold call-to-action color)
- **Dark Gray:** #1a1a1a (Professional, strong)
- **Light Gray:** #f8f8f8 (Clean backgrounds)

### Typography
- **Font:** Inter (Google Fonts)
- **Weights:** 400, 600, 700, 800, 900
- Bold, confident headings with tight letter-spacing

### Style Inspiration
Based on:
- wehaveameeting.com
- uksmosthatedsalestrainer.com

Bold, direct, non-corporate approach that clearly shows the problem solved.

## Features Included

### Homepage Sections
1. **Hero** - Strong headline, dual CTAs, stats
2. **Problems** - 4 common pain points with icons
3. **Solution** - 4-step process with numbered features
4. **Standout** - Why we're different (orange banner)
5. **FAQ** - 3 common questions with detailed answers
6. **Final CTA** - Strong conversion section
7. **Contact Form** - With business position field

### Interactive Features
- Sticky header navigation
- Mobile responsive menu
- Smooth scroll to sections
- Scroll-triggered animations
- AJAX form submission
- Success/error messages

### Mobile Responsive
- Works perfectly on all devices
- Mobile menu toggle
- Responsive grid layouts
- Touch-friendly buttons

## Customization

### Changing Colors
Edit `css/styles.css` lines 10-20:
```css
:root {
    --primary-color: #FF4500;     /* Change main color */
    --secondary-color: #1a1a1a;   /* Change dark color */
    /* etc... */
}
```

### Updating Content
- All content is in `index.html`
- Easy to read and edit
- No build process required

### Adding Images
1. Create an `images/` folder
2. Add your images
3. Reference in HTML: `<img src="images/photo.jpg" alt="Description">`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight (no heavy frameworks)
- Fast loading times
- Optimized fonts from Google Fonts CDN
- Minimal JavaScript

## Next Steps

1. ✅ Homepage complete
2. ⏳ Set up Formspree form
3. ⏳ Build remaining 4 pages
4. ⏳ Add real photos/images
5. ⏳ Create privacy & terms pages
6. ⏳ Deploy to thesalesguy.com.au
7. ⏳ Set up business email (Lee@thesalesguy.com.au)
8. ⏳ Test contact form
9. ⏳ Mobile testing
10. ⏳ SEO optimization

## Support

For questions or issues:
- Check the code comments in each file
- All files are well-organized and commented
- Reach out to your developer

## License

All rights reserved © 2025 The Sales Guy

---

**Built with:** HTML5, CSS3, JavaScript (Vanilla)
**No dependencies, no build process, just clean code**
