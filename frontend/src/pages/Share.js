import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/Share.module.scss';
import { motion } from 'framer-motion';

const Share = () => {
    const n = useNavigate();
    const { id } = useParams();
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className={styles.id}>ID: {id}</div>
            <div className={styles.content}>
                <div className={styles.content__header}>
                    <span className={styles.highlight}>Link</span> to your file
                </div>
                <div className={styles.content__browse}>
                    https://p2p.mindes.ru/{id}
                </div>
                <div className={styles.content__size}>Size: 345mb</div>
            </div>
        </motion.div>
    );
};
export default Share;
