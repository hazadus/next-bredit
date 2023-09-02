# Bredit

This is a Reddit clone built using [Next.js 13](https://nextjs.org/), Firebase, Chakra UI and some other cool tools.

Preview deployed on Vercel, check out the current version: https://next-bredit.vercel.app

(Add credits to freeCodeCamp.org and Shadee Merhi here.)

## Features Implemented

- User authentication using Firebase (email and password, or using Google account)
- Community and user data stored in Firestore database
- Community page SSR
- Responsive UI
- Global app state using Recoil
- Markdown in posts
- Voting on posts
- Comments

## Frameworks and Libraries Used

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Chakra UI Icons](https://chakra-ui.com/getting-started/cra-guide#using-chakra-icons)
- [react-icons](https://www.npmjs.com/package/react-icons): [Icons list](https://react-icons.github.io/react-icons/)
- [Recoil](https://recoiljs.org/) – state management.
- [Firebase](https://console.firebase.google.com/)
  - [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks)
- [safe-json-stringify](https://www.npmjs.com/package/safe-json-stringify) - a wrapper for `JSON.stringify` that handles circular references and prevents defined getters from throwing errors.
- [Moment.js](https://www.npmjs.com/package/moment) - date library for parsing, validating, manipulating, and formatting dates.
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown component for React.
  - [remark-gfm](https://github.com/remarkjs/remark-gfm) - remark plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).

## Tools

- [vscode-react-javascript-snippets](https://github.com/ults-io/vscode-react-javascript-snippets) – Extension for React/Javascript snippets with search supporting ES7+ and babel features.

## References, Notes, Docs

- Next.js
  - [Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts)
  - [getServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)
- React
  - [React: Type {children: Element} has no properties in common with type IntrinsicAttributes](https://bobbyhadz.com/blog/react-type-children-has-no-properties-in-common)
  - [UseEffect Reference](https://react.dev/reference/react/useEffect#reference)
- Chakra UI
  - [Customizing theme tokens](https://chakra-ui.com/docs/styled-system/
    customize-theme#customizing-theme-tokens)
  - [Using fonts](https://chakra-ui.com/community/recipes/using-fonts)
  - [Add elements inside Input](https://chakra-ui.com/docs/components/input/usage#add-elements-inside-input)
  - [Modal](https://chakra-ui.com/docs/components/modal/usage#usage)
    - [How to make custom sized modal in chakra UI](https://stackoverflow.com/questions/70040397/how-to-make-custom-sized-modal-in-chakra-ui) (or just use `<Modal size="xl">`)
  - [Menu](https://chakra-ui.com/docs/components/menu/usage#usage)
  - [Fixed Navbar using Chakra UI](https://dev.to/shriram27/fixed-navbar-using-chakra-ui-4i7b)
- react-markdown
  - [React Markdown: A Thorough Guide With Markdown Examples](https://www.copycat.dev/blog/react-markdown/)

# Getting Started

## Configuration

Create Firebase project for the app. Then, create `.env.local` and put the following variables with corresponding values there:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

## Running the App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
