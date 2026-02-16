# Multi-AI Wrapper Documentation

Welcome to the Multi-AI Wrapper documentation! This directory contains all documentation for the project, available in both HTML and Markdown formats.

## Files Overview

- **index.html** - Modern, standalone HTML version of the landing page (default)
- **index.md** - Jekyll-themed Markdown version of the landing page
- **API.md** - Complete API reference documentation
- **DETAILED_EXPLANATION.md** - In-depth integration guide and best practices
- **SEO_AND_PROMOTION.md** - SEO and marketing strategies
- **_config.yml** - Jekyll configuration for GitHub Pages

## Viewing the Documentation

### Online (GitHub Pages)
Visit: https://mehulbirare.github.io/multi-ai-wrapper/

### Locally

#### HTML Version
```bash
# Navigate to docs folder
cd docs

# Start a simple HTTP server
python3 -m http.server 8080

# Open browser to http://localhost:8080/index.html
```

#### Markdown Version (with Jekyll)
```bash
# Install Jekyll (if not already installed)
gem install bundler jekyll

# Navigate to docs folder
cd docs

# Serve the site locally
jekyll serve

# Open browser to http://localhost:4000/multi-ai-wrapper/
```

## Choosing Between HTML and Markdown

### Use HTML (index.html) when:
- ✅ You want complete control over design and styling
- ✅ You prefer a modern, custom-designed landing page
- ✅ You don't want to depend on Jekyll themes
- ✅ You need faster loading times (no Jekyll processing)

### Use Markdown (index.md) when:
- ✅ You want easy content updates (simpler syntax)
- ✅ You prefer GitHub-style documentation
- ✅ You want automatic theming from Jekyll
- ✅ You want consistency with other `.md` documentation files

## Switching Versions

GitHub Pages serves `index.html` by default if it exists. To switch to the Markdown version:

1. Rename `index.html` to `index.html.bak`
2. Push the changes to GitHub
3. GitHub Pages will now serve `index.md` instead

To switch back:
1. Rename `index.html.bak` back to `index.html`
2. Push the changes

## Contributing

When updating documentation:
1. Update content in both `index.html` and `index.md` to keep them in sync
2. Test both versions locally before committing
3. Ensure all links work correctly in both formats

For detailed contribution guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md)

## Support

- 🐛 [Report Issues](https://github.com/Mehulbirare/multi-ai-wrapper/issues)
- 💬 [GitHub Discussions](https://github.com/Mehulbirare/multi-ai-wrapper/discussions)
- 📦 [npm Package](https://www.npmjs.com/package/multi-ai-wrapper)
