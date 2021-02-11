import React, { memo, PropsWithChildren } from 'react'
import Navbar from 'react-bootstrap/NavBar'
import Container from 'react-bootstrap/Container'
import logo from 'src/static/img/logo.svg'
import { APP_NAME } from 'src/utils/constants'
import styles from './NavBar.module.scss'

const NavBar = ({ children }: PropsWithChildren<unknown>) => (
    <Navbar bg="dark" variant="dark" role="navigation">
        <Container className={styles.navBarContainer}>
            <Navbar.Brand href="/">
                <img src={logo} alt="logo" width="32" />
                {APP_NAME}
            </Navbar.Brand>
            {children}
        </Container>
    </Navbar>
)

export default memo(NavBar)
