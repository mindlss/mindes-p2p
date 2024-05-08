import AppRouter from './router';
import { ReactComponent as Logo } from './assets/logo.svg';
import styles from './styles/App.module.scss';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function App() {
    const n = useNavigate();

    function logoClick() {
        if (window.location.pathname === '/') {
            window.location.reload(false);
        } else {
            n('/');
        }
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <div className={styles.logo}>
                    <Logo
                        className={styles.logo__img}
                        onClick={() => logoClick()}
                    />
                </div>
            </motion.div>
            <AppRouter />
        </div>
    );
}

export default App;
