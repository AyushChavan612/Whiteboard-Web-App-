export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_VITE_CLERK_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ]
};