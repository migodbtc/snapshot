// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";



Sentry.init({
  dsn: "https://4e86920b973bbdb220b5b1f644e9dad9@o4511688546451456.ingest.de.sentry.io/4511688552677456",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  // 100% on development, 10% on production to save on billing
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  
  // Enable logs to be sent to Sentry
  enableLogs: true,

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
