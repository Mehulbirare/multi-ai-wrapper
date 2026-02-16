# GitHub Pages Setup

This repository includes a live documentation site powered by Docsify.

## Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. The documentation will be automatically deployed when you push changes to the `main` branch

## Accessing the Documentation

Once GitHub Pages is enabled, your documentation will be available at:
- **URL**: `https://mehulbirare.github.io/multi-ai-wrapper`

## Local Development

To run the documentation site locally:

```bash
npm install
npm run docs:serve
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Updating Documentation

All documentation files are located in the `docs/` folder:
- `docs/README.md` - Homepage content
- `docs/API.md` - API reference
- `docs/DETAILED_EXPLANATION.md` - Detailed guide
- `docs/SEO_AND_PROMOTION.md` - SEO and promotion strategies
- `docs/_sidebar.md` - Navigation sidebar
- `docs/index.html` - Docsify configuration

Simply edit these Markdown files and push to the `main` branch to update the live documentation.
