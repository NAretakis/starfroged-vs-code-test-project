# Ironsworn Character Generator

A simple character generator for the Ironsworn TTRPG.

## Features

- Generate random characters with stats
- Roll dice for skill checks
- Track character conditions (Health, Spirit, Supply, Momentum)
- Manage character bonds and vows
- Add and track character assets

## Development

To run the project locally:

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

## Building for Production

To build the project for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled files.

## Deploying to GitHub Pages

1. Push your code to a GitHub repository

2. Go to your repository's Settings tab

3. Scroll down to the "GitHub Pages" section

4. For the "Source" option, select:
   - Branch: `main` (or your default branch)
   - Folder: `/docs`

5. Before deploying, build the project and copy the contents of the `dist` directory to a `docs` directory:
   ```bash
   npm run build
   rm -rf docs
   cp -r dist docs
   ```

6. Commit and push the `docs` directory:
   ```bash
   git add docs
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

7. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

## License

This project is open source and available under the MIT License.