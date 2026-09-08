import { onRequestPost as __api_contact_js_onRequestPost } from "/Users/lauraevens/Downloads/Global-Support-Services-website 2/functions/api/contact.js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  ]