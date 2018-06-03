import React, { Component } from "react";
import styles from "./Home.scss";

class Home extends Component {
    render() {
        return (
            <div className={styles["App"]}>
                <header className={styles["App-header"]}>
                    <img className={styles["App-logo"]} alt="logo" />
                    <h1 className={styles["App-title"]}>Welcome to React</h1>
                </header>
                <p className={styles["App-intro"]}>
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}

export default Home;
