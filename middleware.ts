import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "zh"],
  defaultLocale: "en",
});

export default function handler(req, res) {
  // Apply intlMiddleware before authMiddleware
  intlMiddleware(req, res, () => {
    // Apply authMiddleware within intlMiddleware
    authMiddleware({
      beforeAuth: (req) => {
        req.publicRoutes = ["/api/uploadthing"];
        return req;
      },
    })(req, res);
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, as it's handled by Clerk's middleware
  },
};
