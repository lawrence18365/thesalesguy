# Meta Pixel + GTM Implementation Guide

## 🎯 Overview

This guide shows you how to implement Meta Pixel tracking through Google Tag Manager (GTM) for lead generation measurement. You already have GTM installed (GTM-NLGH2BRP), so we'll add Meta Pixel tags to it.

---

## ✅ What You'll Track

1. **PageView** - Every page visit (base tracking)
2. **Lead** - When someone submits a contact form (conversion tracking)

---

## 📋 Prerequisites

- ✅ Google Tag Manager installed (GTM-NLGH2BRP) - **DONE**
- ✅ Web3Forms contact forms working - **DONE**
- ⏳ Meta Pixel ID - **YOU NEED THIS** (get from Facebook Business Manager)
- ⏳ Access to Google Tag Manager - **YOU NEED THIS**

---

## 🔑 Step 1: Get Your Meta Pixel ID

1. **Go to Meta Events Manager**:
   - Visit: https://business.facebook.com/events_manager2
   - Select your Business Account (or create one)

2. **Create or Find Your Pixel**:
   - Click "Connect Data Sources" → "Web" → "Meta Pixel"
   - Click "Set up the Pixel"
   - Choose "Install code manually"
   - Your Pixel ID is in the code - looks like: `fbq('init', '123456789012345');`
   - Copy the number (e.g., `123456789012345`)

---

## 🛠️ Step 2: Add Meta Pixel Base Code to GTM

### Option A: Using GTM Web Interface (RECOMMENDED)

1. **Go to Google Tag Manager**:
   - Visit: https://tagmanager.google.com
   - Select your container (GTM-NLGH2BRP)

2. **Create Meta Pixel Base Code Tag**:
   - Click "Tags" in left sidebar
   - Click "New"
   - Name it: `Meta Pixel - Base Code`
   - Click "Tag Configuration"
   - Choose "Custom HTML"

3. **Paste This Code** (replace YOUR_PIXEL_ID with your actual Pixel ID):

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

4. **Set Trigger**:
   - Click "Triggering"
   - Choose "All Pages"
   - This fires the pixel on every page load

5. **Save the Tag**

---

## 🎯 Step 3: Add Lead Conversion Tracking

Now add a tag that fires when someone submits a form.

### Create the Lead Conversion Tag:

1. **In GTM, create a New Tag**:
   - Click "Tags" → "New"
   - Name it: `Meta Pixel - Lead Conversion`
   - Click "Tag Configuration"
   - Choose "Custom HTML"

2. **Paste This Code**:

```html
<script>
  fbq('track', 'Lead');
</script>
```

3. **Create a Trigger** (you have 2 options):

### **Option A: Form Submission Trigger** (RECOMMENDED for Web3Forms)

1. Click "Triggering" → "+" (new trigger)
2. Name it: `Form Submission - All Forms`
3. Choose "Form Submission"
4. Configure:
   - Wait for Tags: Enabled (2000ms)
   - Check Validation: Enabled
   - Trigger fires on: All Forms
5. Save

### **Option B: Thank You Page Trigger** (if you have a dedicated thank you page)

1. Click "Triggering" → "+" (new trigger)
2. Name it: `Thank You Page View`
3. Choose "Page View"
4. Configure:
   - Trigger fires on: Some Page Views
   - Page URL contains `/thank-you/` (or whatever your thank you page URL is)
5. Save

4. **Save the Tag**

---

## ✅ Step 4: Test Your Setup

### Enable Preview Mode:

1. In GTM, click "Preview" (top right)
2. Enter your website URL: `https://thesalesguy.com.au`
3. Click "Connect"

### Test Base Pixel:

1. Visit any page on your site
2. In GTM Preview, check if "Meta Pixel - Base Code" fired
3. ✅ Should see it in "Tags Fired" section

### Test Lead Conversion:

1. Fill out a contact form on your site
2. Submit the form
3. In GTM Preview, check if "Meta Pixel - Lead Conversion" fired
4. ✅ Should see it in "Tags Fired" after form submission

### Verify in Meta Events Manager:

1. Go to: https://business.facebook.com/events_manager2
2. Select your Pixel
3. Click "Test Events"
4. Visit your website and submit a form
5. ✅ You should see:
   - PageView event when you load the page
   - Lead event when you submit the form

---

## 🚀 Step 5: Publish Your Changes

1. In GTM, click "Submit" (top right)
2. Name the version: `Added Meta Pixel tracking with Lead conversions`
3. Add description: `Installed Meta Pixel base code + Lead conversion tracking for form submissions`
4. Click "Publish"

**Done!** Your Meta Pixel is now live and tracking leads.

---

## 📊 What Data Gets Sent

### PageView Event (fires on every page):
- ✅ Page URL
- ✅ User's browser/device info
- ✅ IP address (for location)
- ❌ NO personal information

### Lead Event (fires on form submission):
- ✅ Email address (hashed)
- ✅ Phone number (hashed)
- ✅ Name (if in form)
- ❌ NO message contents
- ❌ NO sensitive data

**IMPORTANT**: Web3Forms sends data to web3forms.com, and the Lead event fires AFTER the user clicks submit. Meta Pixel captures the email/phone from the form fields automatically (and hashes them for privacy).

---

## 🔐 Privacy Compliance Checklist

- ✅ Privacy policy updated with Meta Pixel disclosure - **DONE**
- ✅ Data limitation explained (only email/phone/name) - **DONE**
- ✅ Overseas transfer disclosure (US) - **DONE**
- ✅ OAIC compliance statement - **DONE**
- ✅ Opt-out links provided - **DONE**
- ⏳ Meta Pixel installed in GTM - **DO THIS**
- ⏳ Lead conversion tracking set up - **DO THIS**

---

## 🆘 Troubleshooting

### "Tags not firing in preview mode"
- Clear browser cache (Ctrl+Shift+R)
- Make sure preview mode is connected
- Check that your GTM container ID matches (GTM-NLGH2BRP)

### "Lead event not firing"
- Check your trigger configuration
- Make sure "Wait for Tags" is enabled (2000ms)
- For Web3Forms, use Form Submission trigger (not Click trigger)
- Test with a real form submission

### "Meta says no pixel detected"
- Check that your Pixel ID is correct in the base code
- Make sure you published the GTM container (not just saved)
- Clear browser cache
- Use Meta Pixel Helper Chrome extension to debug

### "Data not showing in Meta Events Manager"
- Wait 5-10 minutes for data to appear
- Check Test Events first (real-time)
- Make sure pixel is active (not paused)

---

## 📈 Measuring Success

Once live, you can track in Meta Events Manager:

- **PageView Events**: See how many people visit your site
- **Lead Events**: See how many form submissions you get
- **Lead Attribution**: See which ads drive the most leads
- **Cost Per Lead**: Optimize ad spend based on actual conversions

---

## 🎯 Advanced: Enhanced Match (Optional)

To improve ad targeting, you can send additional data with enhanced match:

1. In GTM, edit your "Meta Pixel - Base Code" tag
2. Replace `fbq('init', 'YOUR_PIXEL_ID');` with:

```javascript
fbq('init', 'YOUR_PIXEL_ID', {
  em: '', // Don't pre-fill - Meta auto-captures from form
  ph: '', // Don't pre-fill - Meta auto-captures from form
  external_id: '' // Optional: your internal user ID
});
```

**NOTE**: For most use cases, the standard setup is sufficient. Meta automatically captures email/phone from forms when Lead event fires.

---

## ✅ Quick Summary

**What you need to do**:

1. Get your Meta Pixel ID from Facebook Business Manager
2. In GTM: Create "Meta Pixel - Base Code" tag (fires on All Pages)
3. In GTM: Create "Meta Pixel - Lead Conversion" tag (fires on Form Submission)
4. Test in Preview mode
5. Publish

**Result**:
- ✅ Track all website visitors
- ✅ Track all lead form submissions
- ✅ Measure ad effectiveness
- ✅ Optimize Facebook/Instagram ads
- ✅ Build retargeting audiences
- ✅ Comply with Australian privacy law

---

## 📞 Need Help?

If you get stuck, check:
- **Meta Pixel Helper** (Chrome extension): https://chrome.google.com/webstore/detail/meta-pixel-helper
- **GTM Debugging Guide**: https://support.google.com/tagmanager/answer/6107056
- **Meta Events Manager**: https://business.facebook.com/events_manager2

Your privacy policy is already updated and compliant - just need to install the pixel!
