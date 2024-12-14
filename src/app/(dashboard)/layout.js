import NavBar from "@/components/NavBar";

export default function Home({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}