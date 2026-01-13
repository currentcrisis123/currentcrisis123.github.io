import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Overview from './pages/Overview';
import Contributors from './pages/Contributors';
import Mission from './pages/Mission'
import Events from './pages/Events'
import PatchNotes from './pages/PatchNotes'
import Doc from './pages/admin/Doc';
import AddArticle from './pages/admin/AddArticle';

import Navbar from './components/Navbar'; 
// import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { pageview } from './utils/analytics';
import { getPageTitle } from './hooks/usePageTracking';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = getPageTitle(pathname);
    document.title = "Current Crisis | " + title;
    
    // Track page view with title
    pageview(pathname, title);
  }, [pathname]);

  return (
    <div className="min-h-dvh flex flex-col bg-main bg-fixed bg-cover bg-center">
      <ScrollToTop />
      <Navbar />
      <main className='mx-auto flex-grow w-full'>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/play" element={<Home />} />
          <Route path="/contribute" element={<Contributors />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/patch_notes" element={<PatchNotes />} />
          <Route path="/events" element={<Events />} />
          
          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/docs" element={<Doc/>} />
            <Route path="/admin/add-article" element={<AddArticle />} />
            {/* <Route path="/admin/edit-article/:id" element={<AddArticle />} /> */}
          </Route>
          
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App
