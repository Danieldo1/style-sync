import Companies from "@/components/Companies";
import Hero from "@/components/Hero";
import Usage from "@/components/Usage";


export default function Home() {
  return (
    <main className="">
      {/* <h2 className="text-3xl text1 ">StyleSync</h2> */}
      <Hero />
      <Companies />
      <Usage />
    </main>
  );
}
