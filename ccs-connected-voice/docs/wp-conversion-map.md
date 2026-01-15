# WordPress Conversion Map

This document provides a mapping from the HTML microsite structure to WordPress templates for Phase 3 deployment.

## Overview

The CCS Connected Voice microsite is built with modular HTML that maps cleanly to WordPress template parts and page templates.

---

## Template Mapping

| HTML Partial/Page | WordPress Equivalent | Notes |
|-------------------|---------------------|-------|
| `includes/header.html` | `header.php` or Theme Header Block Pattern | Include navigation logic, dropdown menus |
| `includes/footer.html` | `footer.php` or Theme Footer Block Pattern | Update contact info, links |
| `includes/cta-band.html` | Reusable Block or Shortcode | Create as Gutenberg reusable block |
| `index.html` (home) | `front-page.php` or Page Template | Set as static front page in WP Settings |
| `pricing/index.html` | `page-pricing.php` | Custom page template |
| `contact-us/index.html` | `page-contact.php` | Custom page template with HubSpot shortcode |
| `CloudVOIP/index.html` | Page using `page-product.php` template | |
| `_product-template/` | `page-product.php` | Reusable template for all product pages |

---

## CSS Migration

| HTML CSS File | WordPress Location | Notes |
|---------------|-------------------|-------|
| `assets/css/variables.css` | Theme `style.css` or `custom-properties.css` | Place at top of stylesheet |
| `assets/css/base.css` | Theme `style.css` | Merge with theme base styles |
| `assets/css/components.css` | Theme `style.css` or `components.css` | Enqueue separately if preferred |
| `assets/css/layout.css` | Theme `style.css` | Header, footer, hero styles |
| `assets/css/pages/*.css` | Theme `style.css` or conditional enqueue | Enqueue per-page for performance |

### Recommended Enqueue Strategy

```php
// In functions.php
function ccs_voice_enqueue_styles() {
    wp_enqueue_style('ccs-voice-main', get_template_directory_uri() . '/assets/css/main.css', array(), '1.0.0');
    
    // Conditional page-specific styles
    if (is_page('pricing')) {
        wp_enqueue_style('ccs-voice-pricing', get_template_directory_uri() . '/assets/css/pages/pricing.css', array('ccs-voice-main'), '1.0.0');
    }
}
add_action('wp_enqueue_scripts', 'ccs_voice_enqueue_styles');
```

---

## JavaScript Migration

| HTML JS File | WordPress Location | Notes |
|--------------|-------------------|-------|
| `assets/js/main.js` | Theme `assets/js/main.js` | Enqueue in footer |

### Recommended Enqueue

```php
function ccs_voice_enqueue_scripts() {
    wp_enqueue_script('ccs-voice-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'ccs_voice_enqueue_scripts');
```

---

## Navigation Menu

### Menu Structure

Create a new WordPress menu with the following structure:

```
Main Navigation (microsite-main-nav)
├── Products (custom link: #, has-dropdown class)
│   ├── Cloud VoIP → /CloudVOIP/
│   ├── Call Center Solutions → /CallCenter/
│   ├── Connectivity Solutions → /Connectivity/
│   ├── Managed Network → /ManagedNetwork/
│   └── SIP Connectivity → /SIPConnectivity/
├── Pricing → /pricing/
└── Contact Us → /contact-us/
```

### Menu Walker (if needed)

If the theme doesn't support dropdown styling, create a custom menu walker:

```php
class CCS_Voice_Nav_Walker extends Walker_Nav_Menu {
    // Custom walker for dropdown support
}
```

---

## Page Templates

### Home Page (`front-page.php`)

Sections to implement:
1. Hero Section (ACF fields or page content)
2. Intro Section
3. Products Grid
4. Features Grid
5. CTA Band

### Pricing Page (`page-pricing.php`)

Sections:
1. Hero (compact)
2. Pricing Table
3. CTA Section

### Contact Page (`page-contact.php`)

Sections:
1. Hero (compact)
2. Two-column layout (info + form)
3. CTA Band

HubSpot form integration:
```php
// Option 1: Direct embed in template
<?php echo do_shortcode('[hubspot type=form portal=PORTAL_ID id=FORM_ID]'); ?>

// Option 2: Use HubSpot WordPress plugin
```

### Product Template (`page-product.php`)

Sections:
1. Product Hero
2. Product Overview (2-column)
3. Features Grid
4. Benefits Grid
5. CTA Section

---

## ACF Field Groups (Recommended)

### Hero Fields
- `hero_image` (Image)
- `hero_title` (Text)
- `hero_subtitle` (Text)
- `hero_tagline` (Text)
- `hero_cta_primary_text` (Text)
- `hero_cta_primary_link` (Link)
- `hero_cta_secondary_text` (Text)
- `hero_cta_secondary_link` (Link)

### Product Page Fields
- `product_tagline` (Text)
- `product_overview_headline` (Text)
- `product_overview_content` (WYSIWYG)
- `product_overview_image` (Image)
- `product_features` (Repeater)
  - `feature_icon` (Select or Image)
  - `feature_title` (Text)
- `product_benefits` (Repeater)
  - `benefit_icon` (Select or Image)
  - `benefit_title` (Text)
  - `benefit_description` (Textarea)

### Pricing Page Fields
- `pricing_tiers` (Repeater)
  - `tier_name` (Text)
  - `tier_subtitle` (Text)
  - `tier_price` (Text)
  - `tier_price_unit` (Text)
  - `tier_term` (Text)
  - `tier_onetime` (Textarea)
  - `tier_bundle_value` (Text)
  - `tier_addons` (Textarea)

---

## Custom Post Types (Optional)

If CCS plans to add many product pages, consider a custom post type:

```php
function ccs_voice_register_products() {
    register_post_type('ccs_product', array(
        'labels' => array('name' => 'Products'),
        'public' => true,
        'has_archive' => false,
        'rewrite' => array('slug' => ''),
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'ccs_voice_register_products');
```

---

## Flywheel Deployment Checklist

1. [ ] Create new Flywheel site for subdomain
2. [ ] Install WordPress
3. [ ] Install/configure theme
4. [ ] Import CSS and JS assets
5. [ ] Create page templates
6. [ ] Install ACF Pro (if using custom fields)
7. [ ] Create ACF field groups
8. [ ] Create pages and assign templates
9. [ ] Configure navigation menu
10. [ ] Install HubSpot WordPress plugin
11. [ ] Configure HubSpot form
12. [ ] Set up SSL certificate
13. [ ] Configure subdomain DNS
14. [ ] Test all pages and forms
15. [ ] Configure redirects (vanity domain)

---

## Notes

- The HTML build uses a simple include system (`<!--#include file="..." -->`) that maps directly to WordPress `get_template_part()` calls
- All CSS uses custom properties (CSS variables) for easy theme customization
- Responsive breakpoints match CustomOnline.com: 1200px, 992px, 768px, 480px
- Font (Roboto) is loaded from Google Fonts; consider local hosting for performance
