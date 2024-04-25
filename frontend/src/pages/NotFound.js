import { useNavigate } from "react-router-dom";
  
const NotFound = () => {
    const n = useNavigate();
    return (
        <div onClick={() => n('/')}>123</div>
    );
};
export default NotFound;