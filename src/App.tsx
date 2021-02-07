import React from 'react'
import Button from 'react-bootstrap/Button'
import logo from './logo.svg'
import styles from './App.module.scss'

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Button
                    variant="primary"
                    className={styles.appLink}
                    href="https://reactjs.org"
                    target="_blank"
                >
                    Learn React
                </Button>
            </header>
        </div>
    )
}

export default App
