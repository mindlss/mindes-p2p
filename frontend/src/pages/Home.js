import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { motion } from 'framer-motion';

const Home = () => {
    const n = useNavigate();
    const [filename, setFilename] = useState('');
    const [filesize, setFilesize] = useState(0);
    const inputFile = useRef(null);

    const openExplorer = () => {
        inputFile.current.click();
    };

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;
            var filesize = files[0].size / 1024 / 1024;
            if (filesize < 10) {
                filesize = filesize.toFixed(2);
            } else {
                filesize = Math.round(filesize);
            }
            setFilename(filename);
            setFilesize(filesize);
        }
    };

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
                <div
                    className={styles.content__browse}
                    onClick={() => openExplorer()}
                >
                    {filename ? filename : 'Browse'}
                </div>
                <div className={styles.content__size}>Size: {filesize}mb</div>
                <div className={styles.content__upload}>Upload</div>
                <input
                    type="file"
                    id="file"
                    onChange={handleFileUpload}
                    ref={inputFile}
                    style={{ display: 'none' }}
                />
            </div>
        </motion.div>
    );
};

export default Home;
