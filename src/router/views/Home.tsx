import React from 'react'
import LocationSearchBox from 'src/features/search/LocationSearchBox'
import logo from 'src/static/img/logo.svg'
import { APP_NAME } from 'src/utils/constants'
import styles from './Home.module.scss'

const Home = () => (
    <div className={styles.wrapper}>
        <h1 className="mb-4 text-center">
            <img src={logo} alt="logo" width="64" />
            {APP_NAME}
        </h1>
        <LocationSearchBox size="lg" autoFocus />
    </div>
)

export default Home
