/* eslint-disable no-unused-expressions */
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import { motion } from 'framer-motion';
import WebSocket from 'websocket';
import Share from './Share';
import * as mime from 'react-native-mime-types';

import Peer from 'peerjs';

const Home = () => {
    const ws = useRef(null);
    const [suid, setSuid] = useState('');
    const [uuid, setUuid] = useState('');

    useEffect(() => {
        ws.current = new WebSocket.w3cwebsocket('ws://localhost:3001');

        ws.current.onopen = () => {
            console.log('Connected to server');
        };

        ws.current.onmessage = (event) => {
            console.log(`Received message: ${event.data}`);
            setSuid(event.data);
        };

        ws.current.onclose = () => {
            console.log('Disconnected from server');
        };

        return () => {
            ws.current.close();
        };
    }, []);

    const [file, setFile] = useState(null);
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
            setFile(files[0]);
            setFilename(filename);
            setFilesize(filesize);
        }
    };
    const readFileChunks = (file, chunkSize, callback) => {
        var offset = 0;
        var fr = new FileReader();

        const readNextChunk = () => {
            var slice = file.slice(offset, offset + chunkSize);
            fr.readAsArrayBuffer(slice);
        };

        fr.onload = function () {
            var chunk = fr.result;
            callback(chunk);
            offset += chunkSize;
            if (offset < file.size) {
                readNextChunk();
            }
        };
        fr.onerror = function () {
            console.error('Error reading file');
        };
        readNextChunk();
    };

    const uploadFile = (e) => {
        if (file === null) return;

        let fileInfo = {};

        const peer = new Peer({
            config: { iceServers: [{ urls: 'stun:localhost:3478' }] },
        });

        peer.on('error', (err) => {
            console.log('Server error:', err);
        });

        peer.on('open', () => {
            console.log('Server ID:', peer.id);
            setUuid(peer.id);
            fileInfo = {
                name: filename,
                type: mime.lookup(filename),
                size: file.size,
                peerid: peer.id,
            };

            ws.current.send(JSON.stringify(fileInfo));
        });
        peer.on('connection', (conn) => {
            console.log('peer connected');
            conn.on('open', () => {
                console.log('connection open');
                //fiel send chunks
                conn.send({
                    data: JSON.stringify(fileInfo),
                    type: 'file-info',
                });
                readFileChunks(file, 32 * 1024, function (chunk) {
                    console.log(chunk);
                    conn.send({ chunk: chunk, type: 'file-chunk' });
                });
            });
        });
    };

    let ready = false;

    if (suid.length === 6) {
        ready = true;
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            {ready ? (
                <Share suid={suid} uuid={uuid} filesize={filesize} />
            ) : null}
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
                <div
                    className={styles.content__upload}
                    onClick={() => uploadFile()}
                >
                    Upload
                </div>
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
