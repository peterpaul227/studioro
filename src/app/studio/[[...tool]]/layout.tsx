/**
 * Studio layout — no Nav / no Footer / no Cursor. Just the Studio UI,
 * full viewport. This layout intentionally breaks out of the site chrome
 * so the editor-experience feels like a dedicated app.
 */
export const metadata = {
  title: "Studioro CMS",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
