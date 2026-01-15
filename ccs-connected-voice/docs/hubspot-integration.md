# HubSpot Form Integration Guide

This document outlines the steps to configure HubSpot for the CCS Connected Voice microsite.

---

## Overview

The Contact Us page includes a placeholder for a HubSpot embedded form. This guide covers:

1. HubSpot domain configuration
2. Form embed code setup
3. Testing procedures
4. Troubleshooting

---

## Prerequisites

- Access to CCS HubSpot account
- HubSpot form created (or form ID if already exists)
- Subdomain configured: `ccsconnectedvoice.customonline.com`
- Vanity domain (optional): `ccsconnectedvoice.com`

---

## Step 1: Configure HubSpot Domains

### Add Subdomain to Allowed Domains

1. Log in to HubSpot
2. Navigate to **Settings** (gear icon)
3. Go to **Website** → **Domains & URLs**
4. Click **Connect a domain**
5. Add `ccsconnectedvoice.customonline.com`
6. If using vanity domain, also add `ccsconnectedvoice.com`

### Verify Domain Settings

1. Go to **Settings** → **Marketing** → **Forms**
2. Under **Non-HubSpot Forms**, ensure domains are listed
3. Enable "Allow forms to be embedded on these domains"

---

## Step 2: Get Form Embed Code

### Option A: Create New Form

1. Go to **Marketing** → **Lead Capture** → **Forms**
2. Click **Create form**
3. Select **Embedded form**
4. Add required fields:
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - Phone Number (required)
   - Company Name
   - Number of Employees (dropdown)
   - Services Interested In (checkbox)
   - Additional Information (textarea)
5. Configure form settings:
   - Thank you message or redirect
   - Notification emails
6. Click **Publish**
7. Copy the embed code

### Option B: Use Existing Form

1. Go to **Marketing** → **Lead Capture** → **Forms**
2. Find the existing "Get a Quote" form
3. Click **Actions** → **Share**
4. Copy the embed code

---

## Step 3: Embed the Form

### Update Contact Page HTML

Open `/contact-us/index.html` and locate the HubSpot form container:

```html
<div id="hubspot-form-container">
  <!-- Static form as fallback -->
  <form class="static-form" ...>
    ...
  </form>
</div>

<!-- HubSpot Form Script - Uncomment and update -->
<!--
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
<script>
  document.getElementById('contact-form').style.display = 'none';
  
  hbspt.forms.create({
    region: "na1",
    portalId: "PORTAL_ID",
    formId: "FORM_ID",
    target: "#hubspot-form-container"
  });
</script>
-->
```

### Replace Placeholders

1. Uncomment the script block
2. Replace `PORTAL_ID` with your HubSpot portal ID (found in account settings)
3. Replace `FORM_ID` with the specific form ID
4. Update `region` if needed (na1, eu1, etc.)

### Example

```html
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
<script>
  // Hide static fallback form
  document.getElementById('contact-form').style.display = 'none';
  
  hbspt.forms.create({
    region: "na1",
    portalId: "12345678",
    formId: "abc12345-1234-1234-1234-abcdef123456",
    target: "#hubspot-form-container",
    onFormReady: function() {
      console.log('HubSpot form loaded successfully');
    },
    onFormSubmit: function() {
      console.log('Form submitted');
    }
  });
</script>
```

---

## Step 4: Style the Form (Optional)

HubSpot forms can be styled to match the site. The contact page CSS includes base overrides:

```css
#hubspot-form-container .hs-input {
  font-family: var(--font-primary);
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#hubspot-form-container .hs-button {
  background: var(--color-primary);
  color: white;
  /* etc. */
}
```

For more custom styling, update `/assets/css/pages/contact.css`.

---

## Step 5: Testing

### Pre-Launch Testing Checklist

- [ ] Form loads on the contact page
- [ ] All fields display correctly
- [ ] Required field validation works
- [ ] Form submits successfully
- [ ] Thank you message displays (or redirect works)
- [ ] Submission appears in HubSpot Contacts
- [ ] Email notifications sent (if configured)
- [ ] Form works on mobile devices
- [ ] Form works across browsers (Chrome, Safari, Firefox)

### Test Submission

1. Open the contact page in a browser
2. Fill out the form with test data
3. Submit the form
4. Verify:
   - Success message appears
   - Contact created in HubSpot
   - Any automated workflows triggered

### Cross-Domain Testing

After subdomain is live:

1. Navigate from main site (customonline.com) to microsite
2. Fill out and submit the contact form
3. Verify submission recorded correctly
4. Check for any cookie/tracking issues

---

## Troubleshooting

### Form Not Loading

**Symptoms:** Form container empty, static form still visible

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify portal ID and form ID are correct
3. Confirm domain is added in HubSpot settings
4. Check for ad blockers or privacy extensions

### Form Submission Fails

**Symptoms:** Error message on submit, or nothing happens

**Solutions:**
1. Check network tab for failed requests
2. Verify required fields are filled
3. Check HubSpot form settings for validation rules
4. Ensure HTTPS is enabled on the domain

### Styling Issues

**Symptoms:** Form looks different than expected

**Solutions:**
1. HubSpot forms inject their own CSS; add `!important` to overrides if needed
2. Check for CSS specificity conflicts
3. Use browser inspector to identify conflicting styles

### Cookie Consent Issues

**Symptoms:** Form blocked by cookie consent

**Solutions:**
1. Ensure cookie consent banner allows HubSpot scripts
2. Categorize HubSpot as "Marketing" or "Functional" cookies
3. Test form with and without consent given

---

## HubSpot Resources

- [HubSpot Forms API Documentation](https://developers.hubspot.com/docs/methods/forms/forms_overview)
- [Embed Form Guide](https://knowledge.hubspot.com/forms/how-can-i-embed-a-hubspot-form-on-an-external-site)
- [Form Styling Guide](https://knowledge.hubspot.com/forms/style-your-form)

---

## Contact Information

For HubSpot account access or form configuration questions, contact:
- CCS Marketing Team
- HubSpot Account Admin
