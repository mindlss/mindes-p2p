import AppRouter from './router';
import { ReactComponent as Logo } from './assets/logo.svg';
import styles from './styles/App.module.scss';
import { motion } from 'framer-motion';

function App() {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <Logo className={styles.logo} />
            </motion.div>
            <AppRouter />
        </div>
    );
}

export default App;
