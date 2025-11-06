export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-border/10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8 max-w-screen-xl">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flash⚡Auth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
