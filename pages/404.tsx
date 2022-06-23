import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const page404: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404</title>
        <meta name="description" content="404" />
      </Head>

      <main className={styles.main}>
        <h1>Sorry we could not find what you where looking for</h1>
        <h2>
          Why not head{" "}
          <Link href="/">
            <a>Home</a>
          </Link>
          ?
        </h2>
      </main>
    </div>
  );
};

export default page404;
