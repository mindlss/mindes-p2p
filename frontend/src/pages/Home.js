import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.scss';
import { motion } from 'framer-motion';

const Home = () => {
    const n = useNavigate();
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <div className={styles.content}>
                <div className={styles.content__header}>
                    Choose your <span className={styles.highlight}>file</span>{' '}
                    below
                </div>
                <div className={styles.content__browse}>Browse</div>
                <div className={styles.content__size}>Size: 345mb</div>
                <div className={styles.content__upload}>Upload</div>
            </div>
        </motion.div>
    );
};
export default Home;
