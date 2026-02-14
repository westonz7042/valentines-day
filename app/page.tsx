"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const MAX_NO_CLICKS = 5;
const SCALE_INCREMENT = 0.2;

export default function Home() {
  const router = useRouter();
  const [noClicks, setNoClicks] = useState(0);
  const [yesScale, setYesScale] = useState(1.0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize button position on mount
    if (containerRef) {
      const rect = containerRef.getBoundingClientRect();
      setNoButtonPosition({ x: 0, y: 0 });
    }
  }, [containerRef]);

  const getRandomPosition = () => {
    if (typeof window === "undefined") return { x: 0, y: 0 };

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate safe area (avoid edges and keep button visible)
    const buttonWidth = 120; // Approximate button width
    const buttonHeight = 60; // Approximate button height
    const padding = 20;

    const maxX = viewportWidth - buttonWidth - padding;
    const maxY = viewportHeight - buttonHeight - padding;

    const x = Math.random() * (maxX - padding) + padding;
    const y = Math.random() * (maxY - padding) + padding;

    return { x, y };
  };

  const handleNoClick = () => {
    const newClicks = noClicks + 1;
    setNoClicks(newClicks);
    setYesScale(1.0 + newClicks * SCALE_INCREMENT);

    // Move button to random position
    const newPosition = getRandomPosition();
    setNoButtonPosition(newPosition);

    if (newClicks >= MAX_NO_CLICKS) {
      // Add a small delay to show the final shaking/fire state before redirecting
      setTimeout(() => {
        router.push("/iloveyou");
      }, 500);
    }
  };

  const handleYesClick = () => {
    router.push("/iloveyou");
  };

  const noButtonScale = Math.max(0.5, 1 - noClicks * 0.1);
  const noButtonOpacity = Math.max(0.5, 1 - noClicks * 0.1);

  // Calculate darker colors based on clicks
  const getDarkerColor = (clicks: number, index: number) => {
    const intensity = Math.min(clicks / MAX_NO_CLICKS, 0.7); // Max 70% darker
    const baseColors = [
      ["#ff6b9d", "#ff1744"], // Original colors
      ["#e63950", "#cc0033"], // Darker
      ["#cc2d44", "#b3002e"], // Darker
      ["#b32438", "#990029"], // Darker
      ["#991b2c", "#800024"], // Darker
    ];

    if (clicks === 0) {
      return baseColors[0][index];
    }

    const colorIndex = Math.min(clicks, baseColors.length - 1);
    return baseColors[colorIndex][index];
  };

  // Calculate shake intensity (faster = more intense, but still gradual)
  const getShakeIntensity = (clicks: number) => {
    if (clicks === 0) return 0;
    // Gradually increase shake speed but keep it smooth
    return Math.max(0.25, 0.6 - clicks * 0.06);
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/snoopy3.jpg"
            alt="Snoopy and female Snoopy in romantic style"
            width={400}
            height={300}
            className={styles.image}
            priority
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <h1 className={styles.title}>Will you be my valentine?</h1>

        <div className={styles.buttonContainer} ref={setContainerRef}>
          <div
            className={`${styles.yesButtonWrapper} ${noClicks >= MAX_NO_CLICKS - 1 ? styles.onFire : ""}`}
          >
            <button
              className={`${styles.yesButton} ${noClicks > 0 ? styles.shaking : ""}`}
              onClick={handleYesClick}
              style={
                {
                  "--scale": yesScale.toString(),
                  "--shake-duration":
                    noClicks > 0 ? `${getShakeIntensity(noClicks)}s` : "0s",
                  backgroundImage: `url(/valentines-day/images/snoopy5.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                } as React.CSSProperties & {
                  "--scale": string;
                  "--shake-duration": string;
                }
              }
              aria-label="Yes, I'll be your valentine"
            >
              <svg className={styles.yesButtonSvg} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="yesPath" d="M 10,70 A 90,90 0 1,1 190,70" fill="none" stroke="none" />
                </defs>
                <text className={styles.yesButtonText}>
                  <textPath href="#yesPath" startOffset="50%" textAnchor="middle">
                    Yes
                  </textPath>
                </text>
              </svg>
            </button>
          </div>

          <button
            className={styles.noButton}
            onClick={handleNoClick}
            style={{
              transform: `scale(${noButtonScale})`,
              opacity: noButtonOpacity,
              position: noClicks > 0 ? "fixed" : "relative",
              left: noClicks > 0 ? `${noButtonPosition.x}px` : "auto",
              top: noClicks > 0 ? `${noButtonPosition.y}px` : "auto",
              zIndex: 1000,
            }}
            aria-label="No"
          >
            No
          </button>
        </div>
      </div>
    </main>
  );
}
