import AppRouter from './router';
import { ReactComponent as Logo } from './assets/logo.svg';
import styles from './styles/App.module.scss';

function App() {
    return (
        <div>
            <Logo className={styles.logo} />
            <AppRouter />
        </div>
    );
}

export default App;
