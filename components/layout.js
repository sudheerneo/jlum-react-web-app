// import Header from "../components/header";
import Footer from "../components/footer";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header"), { ssr: false }); // <== key fix

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
