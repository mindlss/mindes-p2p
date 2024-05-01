import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/Download.module.scss';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const copy = async (value) => {
    try {
        await navigator.clipboard.writeText(value);
    } catch (err) {
        toast.error('Something went wrong.', {
            position: 'bottom-center',
            id: 'clipboard',
        });
        return;
    }
    toast.success('Copied!', {
        position: 'bottom-center',
        id: 'clipboard',
    });
};

const Download = () => {
    const n = useNavigate();

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <Toaster
                toastOptions={{
                    className: styles.toaster,
                    style: {
                        borderRadius: '16px',
                        padding: '5px 5px 5px 10px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#2EA7F8',
                            secondary: 'black',
                        },
                    },
                }}
            />
            <div className={styles.id} onClick={() => copy('123')}>
                ID: 123
            </div>
            <div className={styles.content}>
                <div className={styles.content__header}>test.txt</div>
                <div className={styles.content__size}>Size: 345mb</div>
                <div className={styles.content__download}>Download</div>
            </div>
        </motion.div>
    );
};

export default Download;
