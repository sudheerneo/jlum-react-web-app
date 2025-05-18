import BodyClass from "./BodyClass";
import Header from "./src/Header";
import Bodydata from "./src/Bodydata";
import Footer from "./src/Footer";

export default function Home() {
  return (
    <div className="root conatainer-fluid">
      <BodyClass />
      <div className="wrapper">
        <Header />
        <Bodydata />
        <Footer />
      </div>
    </div>
  );
}
