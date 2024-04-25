import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Download from "./pages/Download";
import Share from "./pages/Share";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/:id" element={<Download />} />
      <Route path="/share/:id" element={<Share />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;