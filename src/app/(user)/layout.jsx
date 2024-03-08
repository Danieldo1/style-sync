export default function UserLayout({ children }) {
  return (
    <main className="max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full mx-auto mt-5">
      {children}
    </main>
  );
}
