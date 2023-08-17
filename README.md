# next-bredit

This is a Reddit clone built using [Next.js 13](https://nextjs.org/), Firebase, Chakra UI and some other cool tools.

Deployed on Vercel, check out the current version: https://next-bredit.vercel.app

Add credits to freeCodeCamp.org and Shadee Merhi here.

## Features Implemented

- User authentication using Firebase (email and password, or using Google account)

## Tech Stack Used

- [Next.js](https://nextjs.org/)
  - [Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts)
- React
  - [React: Type {children: Element} has no properties in common with type IntrinsicAttributes](https://bobbyhadz.com/blog/react-type-children-has-no-properties-in-common)
- [Chakra UI](https://chakra-ui.com/)
  - [Customizing theme tokens](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-theme-tokens)
  - [Using fonts](https://chakra-ui.com/community/recipes/using-fonts)
  - [Add elements inside Input](https://chakra-ui.com/docs/components/input/usage#add-elements-inside-input)
  - [Modal](https://chakra-ui.com/docs/components/modal/usage#usage)
  - [Menu](https://chakra-ui.com/docs/components/menu/usage#usage)
- [Chakra UI Icons](https://chakra-ui.com/getting-started/cra-guide#using-chakra-icons)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [Recoil](https://recoiljs.org/) – state management.
- [Firebase](https://console.firebase.google.com/)
  - [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks)
    - [React Firebase Hooks - Auth](https://github.com/csfrequency/react-firebase-hooks/tree/09bf06b28c82b4c3c1beabb1b32a8007232ed045/auth#usecreateuserwithemailandpassword)

## Tools

- [vscode-react-javascript-snippets](https://github.com/ults-io/vscode-react-javascript-snippets) – Extension for React/Javascript snippets with search supporting ES7+ and babel features.

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
