import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "../../components/SessionWrapper";
import { Josefin_Sans, Prompt } from "next/font/google";
import { DashboardNav } from "@/components/DashboardNav";
import { Toaster } from "@/components/ui/toaster";
import Providers from "../providers";


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
            
            <main className="flex h-screen ">
              <Providers >
              <DashboardNav />
              <div className="w-full ml-10 mr-4 my-1 overflow-auto scrollbar-hide">
                {children}
              </div>
              </Providers>
            </main>
            
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
