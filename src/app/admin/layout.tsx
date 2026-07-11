export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A proteção das rotas /admin é feita pelo middleware (src/middleware.ts)
  // O layout serve apenas como wrapper estrutural
  return <>{children}</>;
}


