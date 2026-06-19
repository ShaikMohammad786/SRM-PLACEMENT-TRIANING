import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeContext";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
