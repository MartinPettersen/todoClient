import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";

const ListPage: NextPage = () => {
  const url = uuid();
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const router = useRouter();

  const list = {
    url,
    title: listTitle,
    description: listDescription,
  };

  const createList = () => {
    const listUrl = process.env.URL;
    console.log('new url:');
    console.log(listUrl);
    Axios.post(`https://sheltered-inlet-32387.herokuapp.com/api/list`, list)
      .then(() => console.log("creating list with url: " + list.url))
      .catch((err) => {
        console.error(err);
      });
      setTimeout(() => {
        router.push(`/lists/${url}`)
      }, 3000)
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
            <p className="text orange">Title:</p>
            <input
              className="listTitle"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <p className="text orange">Description:</p>
            <input
              className="listDescription"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
            />
          </div>
        </div>

        <button onClick={createList}>Create List</button>
      </main>
    </div>
  );
};

export default ListPage;
