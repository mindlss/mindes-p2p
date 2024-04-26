import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Download from './pages/Download';
import Share from './pages/Share';
import { AnimatePresence } from 'framer-motion';

const AppRouter = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/:id" element={<Download />} />
                <Route path="/share/:id" element={<Share />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;
