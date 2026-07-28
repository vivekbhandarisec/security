<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/05919246-5c7a-4b7c-9289-8e9a34a98cb1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. If `localhost:3000` is in use, start the app on a different port:
   - PowerShell: `$env:PORT=3001; npm run dev`
   - bash: `PORT=3001 npm run dev`
   - CLI flag: `npm run dev -- --port=3001`
4. Run the app:
   `npm run dev`
