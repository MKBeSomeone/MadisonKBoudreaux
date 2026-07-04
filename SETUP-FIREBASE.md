# Setting Up Login + Suggestion Warehouse (Firebase)

Your site now has code for login (Google + email/password) and a public
Suggestion Warehouse where visitors submit suggestions and you rate them.
This runs entirely in the visitor's browser and talks directly to Firebase
(Google's free backend service) — GitHub Pages itself only hosts the static
files, it doesn't need to run any server code.

None of this works yet until you complete the one-time setup below (about
10–15 minutes). This has to be done by you since it involves creating an
account and generating your own project keys.

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. Click **Add project**, name it something like `madisonkboudreaux-site`, and finish the setup wizard (Google Analytics is optional, feel free to skip it).

## 2. Register a web app

1. In your new project, click the **`</>`** (web) icon to add a web app.
2. Give it a nickname (e.g. "personal site"). You don't need Firebase Hosting — you're using GitHub Pages.
3. Firebase will show you a `firebaseConfig` object that looks like this:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "madisonkboudreaux-site.firebaseapp.com",
  projectId: "madisonkboudreaux-site",
  storageBucket: "madisonkboudreaux-site.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

4. Copy those exact values into **`public/firebase-init.js`** in this project, replacing the `REPLACE_ME` placeholders near the top of the file.

These values are meant to be public — every Firebase web app ships them in its
client-side code — so it's fine that they'll be visible in your site's source.

## 3. Turn on sign-in methods

1. In the Firebase console, go to **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable:
   - **Google** (just toggle it on and pick a support email — usually yours)
   - **Email/Password** (toggle it on)

## 4. Create the database

1. Go to **Build → Firestore Database → Create database**.
2. Choose **Start in production mode**, pick a location close to you, and click Create.
3. Once it's created, go to the **Rules** tab and replace the contents with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /suggestions/{suggestionId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.authorUid == request.auth.uid
                    && request.resource.data.rating == null;
      allow update: if request.auth != null
                    && request.auth.token.email == 'madison.k.boudreaux@gmail.com';
      allow delete: if request.auth != null
                    && request.auth.token.email == 'madison.k.boudreaux@gmail.com';
    }
  }
}
```

4. Click **Publish**.

This makes suggestions publicly readable by anyone (even without logging in),
lets any signed-in visitor submit a new suggestion, and only lets your account
(`madison.k.boudreaux@gmail.com`) rate or delete a suggestion. If you ever want
to change which account has rating power, update both this rule and the
`ADMIN_EMAIL` constant in `public/firebase-init.js` to match.

## 5. Deploy

Once `public/firebase-init.js` has your real config values:

```
npm run deploy
```

Then visit your site — you should be able to sign in and post a suggestion.
Sign in with your own admin account to see the star-rating controls appear
on each suggestion card.

## Notes / limits

- Firebase's free ("Spark") tier is generous for a personal site — plenty of
  reads/writes per day at no cost.
- If you ever add more Firestore-backed features later, they'll reuse the
  same `db` connection already set up in `public/firebase-init.js`.
- Google sign-in requires your site's domain to be in Firebase's list of
  authorized domains. `mkbesomeone.github.io` should already be allowed by
  default, but if Google sign-in errors out, check **Authentication → Settings
  → Authorized domains** and add it if it's missing.
