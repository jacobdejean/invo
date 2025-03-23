import { createCookieSessionStorage } from "react-router";

type SessionData = {
  invoiceData: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      domain: "invo.dev",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      maxAge: 60,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
    },
  });

export { getSession, commitSession, destroySession };
