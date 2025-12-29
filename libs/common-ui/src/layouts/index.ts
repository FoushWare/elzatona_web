/**
 * Layouts Export
 * Shared layout components for admin and website apps
 * v1.0
 */

export { AdminLayout, default as AdminLayoutDefault } from "./AdminLayout";
export type { AdminLayoutProps } from "./AdminLayout";

export {
  WebsiteRootLayout,
  websiteMetadata,
  websiteViewport,
  default as WebsiteRootLayoutDefault,
} from "./WebsiteRootLayout";
export type { WebsiteRootLayoutProps } from "./WebsiteRootLayout";

export {
  AdminRootLayout,
  adminMetadata,
  default as AdminRootLayoutDefault,
} from "./AdminRootLayout";
export type { AdminRootLayoutProps } from "./AdminRootLayout";
