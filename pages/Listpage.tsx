import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";

const ListPage: NextPage = () => {
  const url = uuid();
  const sharedUrl = uuid();

  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const router = useRouter();

  const list = {
    url,
    title: listTitle,
    description: listDescription,
    sharedUrl: sharedUrl,
  };

  const createList = () => {
    const listUrl = process.env.URL;
    Axios.post(`https://sheltered-inlet-32387.herokuapp.com/api/list`, list)
      .then(() => console.log("creating list with url: " + list.url))
      .catch((err) => {
        console.error(err);
      });
    setTimeout(() => {
      router.push(`/lists/${list.url}`);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Creating a Todo List</title>
        <meta name="description" content="Todo List" />
      </Head>

      <main className={styles.main}>
        <h1 className="orange">Creating a New List</h1>
        <div className="inputContainer">
          <div className="wrapper">
            <h2 className="text orange">Title:</h2>
            <input
              className="listTitle"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <h2 className="text orange">Description:</h2>
            <input
              className="listDescription"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="orange-background">
          <h2 onClick={createList}>Create List</h2>
        </div>
      </main>
    </div>
  );
};

export default ListPage;
