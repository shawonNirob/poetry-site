import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import About from './pages/About';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home section="all" />} />
          <Route path="/poems" element={<Home section="poems" />} />
          <Route path="/prose" element={<Home section="prose" />} />
          <Route path="/fiction" element={<Home section="fiction" />} />
          <Route path="/document" element={<Home section="document" />} />
          <Route path="/poems/:slug" element={<WorkPage />} />
          <Route path="/prose/:slug" element={<WorkPage />} />
          <Route path="/fiction/:slug" element={<WorkPage />} />
          <Route path="/document/:slug" element={<WorkPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
