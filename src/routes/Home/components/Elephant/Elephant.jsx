import React from 'react';
import styled from 'styled-components';
import Clock from '../Clock';
import Ghost from '../Ghost';
import styles from './style.module.scss';

const Layout = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export default () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.bookShelf}></div>
        <div className={styles.book}></div>
        <div className={styles.book}></div>
        <div className={styles.book}></div>
        <div className={styles.book}></div>
        <div className={styles.speechBubble}>
          <div className={styles.heart}></div>
        </div>
        <div className={styles.elephant}>
          <div className={styles.head}>
            <div className={styles.eye}></div>
            <div className={styles.trunk}>
              <div className={styles.trunkLine}></div>
              <div className={styles.trunkLine}></div>
              <div className={styles.trunkLine}></div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={(styles.leg, styles.legLeft)}></div>
            <div
              className={(styles.leg, styles.legLeft, styles.legLeftBehind)}
            ></div>
            <div className={(styles.leg, styles.legRight)}></div>
            <div
              className={(styles.leg, styles.legRight, styles.legRightBehind)}
            ></div>
          </div>
        </div>
        <div className={styles.plant}>
          <div className={styles.leaf}></div>
          <div className={styles.leaf}></div>
          <div className={styles.leaf}></div>
          <div className={styles.stem}></div>
          <div className={styles.potTop}></div>
          <div className={styles.potContainer}>
            <div className={styles.pot}></div>
          </div>
        </div>
        <Ghost />
        <Clock />
      </div>
      <h1 className={styles.greeting}>Welcome to my idea gallery</h1>
    </Layout>
  );
};
