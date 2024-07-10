// import Footer from "../components/Footer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
// import Hero from "../components/Hero";
// import SearchBar from "../components/SearchBar";

//this layout is generic accross all components shairng common header, hero and footer

interface Props { //this is the interface the what is layout expecting to receive
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero/>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;