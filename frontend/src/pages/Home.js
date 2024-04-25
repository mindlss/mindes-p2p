import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.scss';
import { ReactComponent as Logo } from '../assets/logo.svg';

const Home = () => {
    const n = useNavigate();
    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />
            <div className={styles.content}>
                <div className={styles.content__header}>
                    Choose your <span className={styles.highlight}>file</span>{' '}
                    below
                </div>
                <div className={styles.content__browse}>Browse</div>
                <div className={styles.content__size}>Size: 345mb</div>
                <div className={styles.content__upload}>Upload</div>
                {/* <div onClick={() => n(`/123`)}>123</div>
                <div onClick={() => n(`/share/123`)}>share</div> */}
            </div>
        </div>
    );
};
export default Home;
