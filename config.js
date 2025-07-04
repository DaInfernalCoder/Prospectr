import themes from "daisyui/src/theming/themes";

const config = {
  // REQUIRED
  appName: "Prospectr",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Prospectr is an AI-powered LinkedIn prospecting tool that helps you find and connect with the right leads for your business.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "leadsprospectr.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "4001a365-4a61-4b7e-a71e-01af4dc2ce52",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        price: 15,
        name: "Pro",
        description: "Everything you need for LinkedIn automation",
        priceDetails: "/month",
        connectionLimit: 500,
        isFeatured: true,
        features: [
          "500 connection requests/month",
          "Unlimited active campaigns",
          "Advanced Auto Reply capabilities",
          "AI message personalization",
          "Priority support",
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Prospectr <noreply@mg.digitalseobull.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Prospectr <customerservice@digitalseobull.com>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "customerservice@digitalseobull.com",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "customerservice@digitalseobull.com",
  },
  colors: {
    // The DaisyUI theme to use. Choose from: light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter
    theme: "black",
    // Main color for browser UI elements
    main: themes["black"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
