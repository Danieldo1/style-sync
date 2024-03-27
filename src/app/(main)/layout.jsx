import { Josefin_Sans, Prompt } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "../../components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import Nav from "@/components/Nav";

const josefsans = Josefin_Sans({
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--josefsans",
  preload: "true",
});

const prompt = Prompt({
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--prompt",
  preload: "true",
});

export const metadata = {
  title: "StyleSync",
  description: "Create your perfect outfit in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={`${josefsans.variable} ${prompt.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Nav />
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </SessionWrapper>
  );
}
