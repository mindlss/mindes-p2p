import { useNavigate, useParams } from "react-router-dom";
import styles from '../styles/Share.module.scss';
import { ReactComponent as Logo } from '../assets/logo.svg';

const Share = () => {
    const n = useNavigate();
    const { id } = useParams()
    return (
        <div >
            <div >FIle Share</div>
            <div onClick={() => n(`/123`)}>{id}</div>
            <div onClick={() => n(`/`)}>home</div>
            <div onClick={() => n(`/123/123`)}>404</div>
        </div>
    );
};
export default Share;
