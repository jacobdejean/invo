import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("new", "routes/new.tsx"),
  route("render-pdf", "routes/render-pdf.ts"),
  route("render-web", "routes/render-web.tsx"),
] satisfies RouteConfig;
