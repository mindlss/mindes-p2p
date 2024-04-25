import { useNavigate } from 'react-router-dom';
import styles from '../styles/NotFound.module.scss';
import { ReactComponent as Logo } from '../assets/logo.svg';

const NotFound = () => {
    const n = useNavigate();
    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />
            <div className={styles.content}>
                <div className={styles.content__header}>
                    Maybe you’re <span className={styles.highlight}>lost</span>?
                </div>
                <div className={styles.content__size}>Page you’re looking for is not found.</div>
                <div className={styles.content__upload}>Take me home</div>
                {/* <div onClick={() => n(`/123`)}>123</div>
                <div onClick={() => n(`/share/123`)}>share</div> */}
            </div>
        </div>
    );
};
export default NotFound;
