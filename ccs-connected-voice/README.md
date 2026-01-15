# CCS Connected Voice Microsite

A standalone microsite for the CCS Connected Voice VoIP product line, built with HTML/CSS/JS and designed for later WordPress conversion.

## Overview

This microsite maintains strict brand consistency with CustomOnline.com and includes:

- **Home Page** - Hero, product overview, features grid, CTA
- **Pricing Page** - Tier comparison table (Phones, Internet, Network, Cameras)
- **Contact Us Page** - HubSpot form integration for lead capture
- **Cloud VoIP Page** - Product sub-page with features
- **Product Template** - Reusable template for additional product pages

## Quick Start

### Development

1. Install dependencies (optional, for serve):
   ```bash
   npm install -g serve
   ```

2. Build the site:
   ```bash
   node build.js
   ```

3. Preview locally:
   ```bash
   npx serve dist
   ```

4. Open browser to `http://localhost:3000`

### Build System

The site uses a lightweight HTML include system. Partials in `/includes/` are processed during build:

```html
<!--#include file="includes/header.html" -->
```

Run `node build.js` to process includes and output to `/dist/`.

## Project Structure

```
ccs-connected-voice/
├── index.html                    # Home page
├── pricing/index.html            # Pricing page
├── contact-us/index.html         # Contact page
├── CloudVOIP/index.html          # Cloud VoIP product page
├── _product-template/index.html  # Template for new pages
├── includes/
│   ├── header.html               # Shared header
│   ├── footer.html               # Shared footer
│   └── cta-band.html             # CTA section
├── assets/
│   ├── css/
│   │   ├── variables.css         # CSS custom properties
│   │   ├── base.css              # Reset, typography
│   │   ├── components.css        # Buttons, cards
│   │   ├── layout.css            # Header, footer, hero
│   │   └── pages/                # Page-specific styles
│   ├── js/
│   │   └── main.js               # Navigation, animations
│   └── images/
│       ├── logo/                 # Logo options
│       ├── hero/                 # Hero backgrounds
│       ├── products/             # Product images
│       └── icons/                # Icons
├── docs/
│   ├── product-page-guide.md     # Guide for CCS
│   ├── wp-conversion-map.md      # WordPress mapping
│   └── hubspot-integration.md    # HubSpot setup
├── build.js                      # Build script
└── README.md                     # This file
```

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Main landing page |
| Pricing | `/pricing/` | Product pricing comparison |
| Contact Us | `/contact-us/` | Quote request form |
| Cloud VoIP | `/CloudVOIP/` | Cloud VoIP product page |
| Call Center* | `/CallCenter/` | To be created by CCS |
| Connectivity* | `/Connectivity/` | To be created by CCS |
| Managed Network* | `/ManagedNetwork/` | To be created by CCS |
| SIP Connectivity* | `/SIPConnectivity/` | To be created by CCS |

*Use `_product-template` to create these pages.

## Logo Options

Three logo options are available in `/assets/images/logo/`:

- **Option A**: Text-only lockup with CCS hexagon mark
- **Option B**: Connectivity/network icon + text
- **Option C**: Sound wave/communication icon + text

Each includes color and white variants for different backgrounds.

## Brand Consistency

The site uses CSS custom properties matching CustomOnline.com:

```css
--color-primary: #2f4ea0;      /* Main blue */
--color-primary-dark: #10001e;  /* Dark navy */
--color-teal: #00b4d8;          /* Accent */
--font-primary: 'Roboto', sans-serif;
```

## Documentation

- [Product Page Guide](docs/product-page-guide.md) - Instructions for creating new product pages
- [WordPress Conversion Map](docs/wp-conversion-map.md) - Phase 3 WordPress migration guide
- [HubSpot Integration](docs/hubspot-integration.md) - Form setup and configuration

## Deployment

### Phase 3 (WordPress)

1. Set up Flywheel WordPress instance
2. Configure subdomain: `ccsconnectedvoice.customonline.com`
3. Convert HTML templates to WordPress templates
4. Configure HubSpot form
5. Set up vanity domain redirect: `ccsconnectedvoice.com`

See [WordPress Conversion Map](docs/wp-conversion-map.md) for detailed instructions.

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Safari iOS (latest)
- Chrome Android (latest)

## Contact

For questions about this microsite, contact the development team.
