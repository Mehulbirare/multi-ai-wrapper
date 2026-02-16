# GitHub Pages Setup Instructions

This document explains how to enable GitHub Pages for the documentation in the `docs` folder.

## What Was Fixed

The 404 error when publishing the docs folder was caused by the absence of an `index.md` (or `index.html`) file. GitHub Pages requires an index file to serve as the landing page.

### Changes Made:

1. **Created `docs/index.md`**: This is the main landing page for the documentation site
   - Provides an overview of the Multi-AI Wrapper
   - Links to all documentation pages (API.md, DETAILED_EXPLANATION.md, SEO_AND_PROMOTION.md)
   - Includes a quick start guide

2. **Created `docs/_config.yml`**: Jekyll configuration for GitHub Pages
   - Sets the theme (Cayman theme)
   - Configures site metadata (title, description)
   - Sets up proper URL structure

## How to Enable GitHub Pages

To publish your documentation and make it accessible, follow these steps:

### Step 1: Access Repository Settings

1. Go to your GitHub repository: https://github.com/Mehulbirare/multi-ai-wrapper
2. Click on **Settings** (in the top menu)

### Step 2: Navigate to Pages Settings

1. In the left sidebar, scroll down and click on **Pages** (under "Code and automation")

### Step 3: Configure Source

1. Under "Build and deployment" → "Source":
   - Select **Deploy from a branch**

2. Under "Branch":
   - Select the branch: **main** (or the branch you want to publish from)
   - Select the folder: **/docs**
   - Click **Save**

### Step 4: Wait for Deployment

1. GitHub will start building your site (this may take 1-2 minutes)
2. Once deployed, you'll see a message: "Your site is live at `https://mehulbirare.github.io/multi-ai-wrapper/`"

### Step 5: Access Your Documentation

Your documentation will be available at:
```
https://mehulbirare.github.io/multi-ai-wrapper/
```

Individual pages will be accessible at:
- API Documentation: `https://mehulbirare.github.io/multi-ai-wrapper/API`
- Detailed Explanation: `https://mehulbirare.github.io/multi-ai-wrapper/DETAILED_EXPLANATION`
- SEO Guide: `https://mehulbirare.github.io/multi-ai-wrapper/SEO_AND_PROMOTION`

## Troubleshooting

### Still Getting 404?

1. **Check that GitHub Pages is enabled** in repository settings
2. **Verify the branch and folder** are set correctly (should be `/docs`)
3. **Wait a few minutes** - GitHub Pages can take 1-2 minutes to build and deploy
4. **Clear your browser cache** and try accessing the URL again

### Check Build Status

1. Go to the **Actions** tab in your repository
2. Look for "pages build and deployment" workflows
3. If any failed, click on them to see error details

### Custom Domain (Optional)

If you want to use a custom domain:
1. In Pages settings, enter your custom domain under "Custom domain"
2. Follow GitHub's instructions to configure DNS

## Testing Locally (Optional)

To test the documentation site locally before publishing:

```bash
# Install Jekyll
gem install bundler jekyll

# Navigate to docs folder
cd docs

# Serve the site locally
jekyll serve

# Visit http://localhost:4000/multi-ai-wrapper/ in your browser
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Jekyll Themes](https://pages.github.com/themes/)
