console.log("@@@@@@@@@", process.env.baseURL);

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@assets/scss/global.pcss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/style-resources",
    "@nuxtjs/dotenv",
  ],

  styleResources: {
    // your settings here
    sass: [],
    scss: ["./assets/scss/_variables.scss", "./assets/scss/_mixins.scss"],
    less: [],
    stylus: [],
    hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: "https://api.dimelo.io",
    // baseURL: "http://localhost:3000",
    baseURL: process.env.baseURL
      ? process.env.baseURL
      : "http://localhost:3000",
    credentials: true,
    // common: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    requestInterceptor: (config, { stroe }) => {
      config.headers.common["Access-Control-Allow-Origin"] =
        "https://api.dimelo.io";
      config.withCredentials = true;
      return config;
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // dev port
  server: {
    port: 8000,
  },

  // nuxt/auth
  // router: {
  //   middleware: ["auth"],
  // },

  auth: {
    localStorage: {
      // prefix: 'auth.'
    },
    cookie: {
      // prefix: 'auth.',
      // options: {
      //   sameSite: 'lax',
      // }
    },
    redirect: {
      // login: "/user/login",
      // logout: "/user/login",
      // home: "/"
    },
    strategies: {
      cookie: {
        cookie: {
          // (optional) If set, we check this cookie existence for loggedIn check
          // name: "connect.sid",
        },
        endpoints: {
          // (optional) If set, we send a get request to this endpoint before login
          csrf: {
            url: "",
          },
          user: { url: "/api/users/me", method: "get" },
        },
      },
      local: {
        token: {
          maxAge: false,
          required: false,
          type: false,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/api/auth/login", method: "post" },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/users/me", method: "get" },
        },
      },
    },
  },

  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
};
