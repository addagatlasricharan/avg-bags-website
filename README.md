# AVG Bags — Website Source Code

Premium non-woven fabric bag manufacturer website built with React + Vite.

## Tech Stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion (animations)
- Wouter (routing)
- shadcn/ui components

## Getting Started

### 1. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Start development server
```bash
npm run dev
```
Open http://localhost:5173

### 3. Build for production
```bash
npm run build
```
Output is in the `dist/` folder — deploy to Netlify, Vercel, or any static host.

### 4. Preview production build
```bash
npm run preview
```

## Deployment

### Netlify
1. Run `npm run build`
2. Deploy the `dist/` folder
3. Add a `_redirects` file in `public/` with: `/* /index.html 200` (for SPA routing)

### Vercel
1. Connect the repo
2. Set Framework: Vite
3. Build command: `npm run build`
4. Output dir: `dist`

### Any static host (GitHub Pages, Cloudflare Pages, etc.)
1. Run `npm run build`
2. Upload contents of `dist/` to your host
3. Configure your host to serve `index.html` for all routes (SPA routing)

## Contact Info
- Phone: +91 7780524290
- Email: avgbags@gmail.com
- Location: Warangal, Telangana, India
