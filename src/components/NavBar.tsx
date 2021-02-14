import React, { memo, PropsWithChildren } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import logo from 'src/static/img/logo.svg'
import { APP_NAME } from 'src/utils/constants'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

const NavBar = ({ children }: PropsWithChildren<unknown>) => (
    <Navbar bg="dark" variant="dark" role="navigation">
        <Container className={styles.navBarContainer}>
            <Navbar.Brand as={Link} to="/">
                <img src={logo as string} alt="logo" width="32" />
                {APP_NAME}
            </Navbar.Brand>
            {children}
        </Container>
    </Navbar>
)

export default memo(NavBar)
