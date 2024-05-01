import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/Download.module.scss';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import SimplePeer from 'simple-peer';
import wrtc from 'wrtc';

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

const sgnl = String.raw`{"type":"offer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0 696620877570560155 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 42:0B:A9:24:C3:88:72:85:A6:83:50:90:2B:F2:9D:BE:C8:D5:DB:13:4F:E9:E4:88:FC:E1:D7:15:3A:3D:5D:7E\r\na=group:BUNDLE 0\r\na=msid-semantic:WMS *\r\nm=application 49667 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 178.213.116.90\r\na=candidate:0 1 UDP 2122187007 6bdc6fca-3a95-40f7-bea3-75cc61b5d77b.local 49667 typ host\r\na=candidate:2 1 UDP 2122252543 801aecbe-88b3-4cab-abf6-2ae541414a1d.local 49668 typ host\r\na=candidate:4 1 TCP 2105458943 6bdc6fca-3a95-40f7-bea3-75cc61b5d77b.local 9 typ host tcptype active\r\na=candidate:5 1 TCP 2105524479 801aecbe-88b3-4cab-abf6-2ae541414a1d.local 9 typ host tcptype active\r\na=candidate:1 1 UDP 1685987327 178.213.116.90 49667 typ srflx raddr 0.0.0.0 rport 0\r\na=sendrecv\r\na=end-of-candidates\r\na=ice-pwd:90b9b84928a37c02d36c83f393b95eb2\r\na=ice-ufrag:9497fc4d\r\na=mid:0\r\na=setup:actpass\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}`

const Download = () => {
  const n = useNavigate();
  const { id: peerId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        wrtc: wrtc,
    });

    

    peer.signal(JSON.parse(sgnl))
  };

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
      <div className={styles.id} onClick={() => copy(peerId)}>
        ID: {peerId}
      </div>
      <div className={styles.content}>
        <div className={styles.content__header}>test.txt</div>
        <div className={styles.content__size}>Size: 345mb</div>
        <div className={styles.content__download} onClick={handleDownload}>
          {loading ? 'Downloading...' : 'Download'}
        </div>
      </div>
    </motion.div>
  );
};

export default Download;
