import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List App</title>
        <meta name="description" content="Todo List" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Your todo app</h1>

        <h2>Want to share a Todo list with friends? familie? coworkers?</h2>
        <h2>No login or signup needed!</h2>
        <h2>Just create your Todo List and share the URL</h2>

        <div className="orange-background">
          <Link href="Listpage">
            <a className="white">
              <h2>Create a New List</h2>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
