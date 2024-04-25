import { useNavigate } from "react-router-dom";
  
const NotFound = () => {
    const n = useNavigate();
    return (
        <div onClick={() => n('/')}>Home</div>
    );
};
export default NotFound;