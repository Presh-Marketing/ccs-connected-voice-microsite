# Product Page Creation Guide

This guide explains how to create new product pages for the CCS Connected Voice microsite using the provided template.

---

## Overview

The microsite includes a reusable product page template that maintains brand consistency. CCS can use this template to create additional product pages without additional design work.

---

## Quick Start

### Step 1: Copy the Template

Copy the entire `_product-template` folder and rename it to your product URL slug:

```
_product-template/  →  CallCenter/
                   →  Connectivity/
                   →  ManagedNetwork/
                   →  SIPConnectivity/
```

### Step 2: Update the HTML File

Open `index.html` in your new folder and replace the placeholder tokens.

---

## Placeholder Tokens Reference

| Token | Description | Example |
|-------|-------------|---------|
| `{{PRODUCT_NAME}}` | Product name (used in title, headings) | Call Center Solutions |
| `{{PRODUCT_TAGLINE}}` | Short tagline for hero | Advanced routing and analytics for your team |
| `{{PRODUCT_HEADLINE}}` | Main headline in overview section | Transform Your Customer Service |
| `{{PRODUCT_DESCRIPTION_PARAGRAPH_1}}` | First paragraph of overview | Our call center solutions... |
| `{{PRODUCT_DESCRIPTION_PARAGRAPH_2}}` | Second paragraph of overview | With real-time analytics... |
| `{{PRODUCT_DESCRIPTION_SHORT}}` | Meta description (SEO) | 160 characters max |
| `{{PRODUCT_NAME_LOWERCASE}}` | Lowercase product name | call center solutions |
| `{{FEATURE_1_TITLE}}` through `{{FEATURE_8_TITLE}}` | Feature card titles | Skills-Based Routing |

---

## Updating Content

### 1. Page Title and Meta Description

```html
<title>{{PRODUCT_NAME}} | CCS Connected Voice</title>
<meta name="description" content="{{PRODUCT_DESCRIPTION_SHORT}}">
```

**Example:**
```html
<title>Call Center Solutions | CCS Connected Voice</title>
<meta name="description" content="Advanced call center solutions with intelligent routing, real-time analytics, and workforce optimization from CCS Connected Voice.">
```

### 2. Hero Section

Update the hero image and text:

```html
<section class="hero product-hero" id="main-content">
  <div class="hero-background">
    <!-- Replace with your product image -->
    <img src="/assets/images/hero/call-center-hero.jpg" alt="" aria-hidden="true">
  </div>
  <div class="hero-content">
    <p class="hero-tagline">CCS Connected Voice</p>
    <h1 class="hero-title">Call Center Solutions</h1>
    <p class="hero-subtitle">Advanced routing and analytics for customer service excellence.</p>
    ...
  </div>
</section>
```

### 3. Overview Section

Update the headline, paragraphs, and image:

```html
<div class="product-overview-content">
  <h2>Transform Your Customer Service Operations</h2>
  <p>
    <strong>Deliver exceptional customer experiences</strong> with our enterprise-grade call center platform...
  </p>
  <p>
    With real-time queue monitoring, intelligent routing, and comprehensive analytics...
  </p>
</div>
<div class="product-overview-image">
  <img src="/assets/images/products/call-center-dashboard.jpg" alt="Call Center Dashboard">
</div>
```

### 4. Features Section

Update each feature card with your product's features:

```html
<div class="product-feature-card">
  <div class="product-feature-icon">
    <!-- Keep or replace SVG icon -->
    <svg>...</svg>
  </div>
  <h3 class="product-feature-title">Skills-Based Routing</h3>
</div>
```

**Tip:** You can add or remove feature cards. The grid automatically adjusts.

### 5. Benefits Section

The benefits section (Our Everything Plan) can be customized or left as-is since these apply to all products.

---

## Adding Images

### Image Locations

Place product images in the appropriate folders:

```
assets/
├── images/
│   ├── hero/           ← Hero background images (1920x600 recommended)
│   ├── products/       ← Product overview images (600x400 recommended)
│   └── icons/          ← Custom icons (if needed)
```

### Image Guidelines

- **Hero Images:** 1920x600px or larger, landscape orientation
- **Product Images:** 600x400px or larger
- **Format:** JPG for photos, PNG for graphics with transparency
- **Optimization:** Compress images before uploading (use TinyPNG or similar)

---

## Testing Your Page

### Local Preview

1. Run the build script:
   ```bash
   node build.js
   ```

2. Start a local server:
   ```bash
   npx serve dist
   ```

3. Open your browser to `http://localhost:3000/YourProductSlug/`

### Checklist

Before considering the page complete:

- [ ] All placeholder tokens replaced
- [ ] Hero image updated
- [ ] Overview image updated
- [ ] All feature titles updated (at least 6-8 features)
- [ ] Meta description updated
- [ ] Page title correct
- [ ] Navigation links work (Pricing, Contact Us)
- [ ] Page displays correctly on mobile
- [ ] No broken images

---

## URL Naming Convention

Product pages use PascalCase URLs as specified:

| Product | URL |
|---------|-----|
| Cloud VoIP | `/CloudVOIP/` |
| Call Center Solutions | `/CallCenter/` |
| Connectivity Solutions | `/Connectivity/` |
| Managed Network | `/ManagedNetwork/` |
| SIP Connectivity | `/SIPConnectivity/` |

**Important:** Always include the trailing slash.

---

## Do's and Don'ts

### Do's

✅ Use the existing color palette (blues, teals, grays)
✅ Maintain consistent spacing patterns
✅ Keep button styles consistent
✅ Use high-quality, professional images
✅ Write clear, concise feature titles
✅ Test on mobile devices

### Don'ts

❌ Don't add new colors (stick to CSS variables)
❌ Don't change font sizes or families
❌ Don't modify the header or footer
❌ Don't remove the skip link or accessibility features
❌ Don't use low-resolution images
❌ Don't create URLs with spaces or special characters

---

## CSS Variables Reference

If you need to reference colors or spacing, use these CSS variables:

```css
/* Colors */
--color-primary: #2f4ea0;      /* Main blue */
--color-primary-dark: #10001e;  /* Dark navy */
--color-teal: #00b4d8;          /* Accent teal */
--color-gray: #666666;          /* Body text */
--color-gray-dark: #333333;     /* Headings */
--color-gray-light: #f5f5f5;    /* Backgrounds */

/* Spacing */
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 40px;
--spacing-xl: 60px;
--spacing-xxl: 80px;
```

---

## Need Help?

If you encounter issues or need design guidance:

1. Refer to the Cloud VoIP page (`/CloudVOIP/`) as a complete example
2. Compare your page to the template to identify differences
3. Contact the development team for assistance

---

## File Structure Reference

```
YourProduct/
└── index.html          ← Your product page

assets/
├── images/
│   ├── hero/
│   │   └── your-product-hero.jpg
│   └── products/
│       └── your-product-image.jpg
```
