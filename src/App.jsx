import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import Services from './pages/Services.jsx';
import Team from './pages/Team.jsx';

export default function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}
