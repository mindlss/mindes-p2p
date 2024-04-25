import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/Download.module.scss';
import { ReactComponent as Logo } from '../assets/logo.svg';

const Download = () => {
    const n = useNavigate();
    const { id } = useParams();
    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />
            <div className={styles.id}>ID: {id}</div>
            <div className={styles.content}>
                <div className={styles.content__header}>test.txt</div>
                <div className={styles.content__size}>Size: 345mb</div>
                <div className={styles.content__download}>Download</div>
                {/* <div onClick={() => n(`/123`)}>123</div>
                <div onClick={() => n(`/share/123`)}>share</div> */}
            </div>
        </div>
    );
};
export default Download;
