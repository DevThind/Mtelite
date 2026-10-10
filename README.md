# MT Elite Bookkeeping

A responsive React, TypeScript, and Tailwind CSS website for MT Elite Bookkeeping.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` for a production build in `dist/`.

## Content and assets

- Edit the contact email, navigation, services, FAQs, and process copy in `src/content.ts`.
- The page and form are in `src/App.tsx`; visual styles are in `src/styles.css`.
- Optimised responsive photographs are in `public/images/`. The supplied PNG originals are preserved in `assets/originals/` and are excluded from the deployed page.

## Contact enquiries

The contact section and footer link to `Mtelitebookkeeping@gmail.com`. The enquiry form validates the visitor's details and prepares an email draft, including their selected service. Visitors review and send it through their own email app; the site does not claim to send enquiries or store form details. Direct email links remain available for visitors who prefer to contact the business without filling in the form.

The visual design uses warm ivory, charcoal, muted gold, editorial serif headings, and the supplied responsive photography. Mobile navigation supports Escape, outside-click dismissal, and keyboard focus restoration. The site respects reduced-motion preferences.
