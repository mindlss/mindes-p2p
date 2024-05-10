/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../styles/Download.module.scss';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import streamSaver from 'streamsaver';
import NotFound from './NotFound';

import Peer from 'peerjs';

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
    const { id } = useParams();
    const [downloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileOffer, setFileOffer] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/getFileInfo/${id}`) // замените на ваш URL
            .then((response) => {
                setStatus(response.status);
                return response.json();
            })
            .then((json) => setFileOffer(json))
            .catch((error) => console.error(error));
    }, []);

    const downloadFile = (e) => {
        setDownloading(true);
        console.log('121121');
        const peer = new Peer({
            config: { iceServers: [{ urls: 'stun:localhost:3478' }] },
        });
        console.log('121');
        let fileSize = 0;
        let receivedBytes = 0;
        let fileName = '';
        let fileType = '';

        peer.on('open', () => {
            console.log('1');
            const conn = peer.connect(fileOffer.uuid);
            conn.on('open', () => {
                console.log('hi from peer!');
                const fileStream = streamSaver.createWriteStream(fileOffer.filename);
                const writer = fileStream.getWriter();
                conn.on('data', async (data) => {
                    if (data.type === 'file-info') {
                        const fileInfo = JSON.parse(data.data);
                        fileSize = fileInfo.size;
                        fileName = fileInfo.name;
                        fileType = fileInfo.type;
                        receivedBytes = 0;

                        console.log(fileSize);
                        console.log(fileName);
                        console.log(fileType);
                    } else if (data.type === 'file-chunk') {
                        await writer.write(data.chunk);
                        receivedBytes += data.chunk.byteLength;
                        setProgress((receivedBytes / fileSize) * 100);
                        if (receivedBytes === fileSize) {
                            await writer.close();
                            console.log('done');
                            setDownloading(false);
                        }
                    }
                });
            });
        });
    };

    if (status !== 200 || !fileOffer) {
        return <NotFound />;
    }

    var filesize = fileOffer.filesize / 1024 / 1024;
    if (filesize < 10) {
        filesize = filesize.toFixed(2);
    } else {
        filesize = Math.round(filesize);
    }

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
            <div className={styles.id} onClick={() => copy(fileOffer.uuid)}>
                ID: {fileOffer.uuid}
            </div>
            <div className={styles.content}>
                <div className={styles.content__header}>
                    {fileOffer.filename}
                </div>
                <div className={styles.content__size}>Size: {filesize}mb</div>
                <div
                    className={`${styles.content__download} ${
                        downloading ? styles.downloading : ''
                    }`}
                    onClick={() => downloadFile()}
                >
                    {downloading
                        ? `Downloading... ${progress.toFixed(2)}%`
                        : 'Download'}
                </div>
            </div>
        </motion.div>
    );
};

export default Download;
