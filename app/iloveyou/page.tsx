"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function ILoveYou() {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>I Love You Most!!!</h1>

        <div className={styles.imageContainer}>
          {!imageError ? (
            <Image
              src="/valentines-day/images/snoopy4.jpg"
              alt="Placeholder image - replace with your own"
              width={500}
              height={400}
              className={styles.image}
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.fallback}>image error</div>
          )}
        </div>

        <p className={styles.message}>
          Thank you for being my amazing girlfriend! 💕
        </p>

        <button
          className={styles.gameButton}
          onClick={() => router.push("/connections")}
        >
          Play Connections Game
        </button>
      </div>
    </main>
  );
}
