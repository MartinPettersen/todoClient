import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Axios from "axios";

const share: NextPage = () => {
 

 

  return (
    <div className={styles.container}>
      <Head>
        <title>Sharing a Todo List</title>
        <meta name="description" content="Todo List" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sharing the Todo List
        </h1>

        <h3>Select the link with the level of access you want to give</h3>
        <p>Read Only:</p>
        <p>Read and Mark</p>
        <p>Read and Write:</p>

      </main>

    </div>
  )
}


export default share;
