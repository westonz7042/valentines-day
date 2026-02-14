"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface Category {
  name: string;
  items: string[];
  difficulty: "easy" | "medium" | "hard" | "very-hard";
}

const CATEGORIES: Category[] = [
  {
    name: "things i love about you",
    items: ["SMILE", "LAUGH", "SIGH", "HUGS"],
    difficulty: "easy",
  },
  {
    name: "why you're the best",
    items: ["GENIUS", "FUNNY", "CARING", "GOAT"],
    difficulty: "medium",
  },
  {
    name: "what i can provide on dates",
    items: ["BAG HOLDING", "MASSAGES", "BIG BICEPS", "HAND HOLDING"],
    difficulty: "hard",
  },
  {
    name: "favorite meals together minus the first letter",
    items: ["BBQ", "MAKASE", "OKE", "HO"],
    difficulty: "very-hard",
  },
];

const SECRET_CODE = process.env.NEXT_PUBLIC_SECRET_CODE;

export default function Connections() {
  const router = useRouter();
  const [allItems, setAllItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [foundGroups, setFoundGroups] = useState<Category[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);

  useEffect(() => {
    // Shuffle all items on load
    const shuffled = CATEGORIES.flatMap((cat) => cat.items).sort(
      () => Math.random() - 0.5,
    );
    setAllItems(shuffled);
  }, []);

  const handleItemClick = (item: string) => {
    if (foundGroups.some((group) => group.items.includes(item))) {
      return; // Already found
    }

    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const checkSelection = () => {
    if (selectedItems.length !== 4) return;

    // Check if selected items form a valid category
    const matchingCategory = CATEGORIES.find((category) => {
      return (
        selectedItems.every((item) => category.items.includes(item)) &&
        !foundGroups.some((group) => group.name === category.name)
      );
    });

    if (matchingCategory) {
      // Correct group found
      setFoundGroups([...foundGroups, matchingCategory]);
      setAllItems(
        allItems.filter((item) => !matchingCategory.items.includes(item)),
      );
      setSelectedItems([]);

      // Check if game is won
      if (foundGroups.length + 1 === CATEGORIES.length) {
        setGameWon(true);
        setTimeout(() => {
          setShowSecretCode(true);
        }, 1000);
      }
    } else {
      // Wrong selection
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= 4) {
        // Game over after 4 mistakes
        alert("Too many mistakes! Try again.");
        router.push("/iloveyou");
      }
      setSelectedItems([]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "#6aaa64";
      case "medium":
        return "#c9b458";
      case "hard":
        return "#ee6c4d";
      case "very-hard":
        return "#8b5cf6";
      default:
        return "#6aaa64";
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Weston + Na Yeon Connections</h1>
        <p className={styles.subtitle}>Special reward at the end!</p>

        {foundGroups.length > 0 && (
          <div className={styles.foundGroups}>
            <h2>Found Groups:</h2>
            {foundGroups.map((group, index) => (
              <div
                key={index}
                className={styles.foundGroup}
                style={{
                  backgroundColor: getDifficultyColor(group.difficulty),
                }}
              >
                <span className={styles.groupName}>{group.name}</span>
                <div className={styles.groupItems}>
                  {group.items.map((item, i) => (
                    <span key={i} className={styles.groupItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.gameArea}>
          <div className={styles.itemsGrid}>
            {allItems.map((item, index) => {
              const isSelected = selectedItems.includes(item);
              const isFound = foundGroups.some((group) =>
                group.items.includes(item),
              );

              return (
                <button
                  key={index}
                  className={`${styles.itemButton} ${
                    isSelected ? styles.selected : ""
                  } ${isFound ? styles.found : ""}`}
                  onClick={() => handleItemClick(item)}
                  disabled={isFound}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {selectedItems.length > 0 && (
            <div className={styles.selectionArea}>
              <p className={styles.selectionText}>
                Selected ({selectedItems.length}/4):
              </p>
              <div className={styles.selectedItems}>
                {selectedItems.map((item, index) => (
                  <span key={index} className={styles.selectedItem}>
                    {item}
                  </span>
                ))}
              </div>
              {selectedItems.length === 4 && (
                <button
                  className={styles.submitButton}
                  onClick={checkSelection}
                >
                  Submit Group
                </button>
              )}
            </div>
          )}

          <div className={styles.stats}>
            <p>Mistakes: {mistakes}/4</p>
            <p>Groups Found: {foundGroups.length}/4</p>
          </div>
        </div>

        {showSecretCode && (
          <div className={styles.secretCode}>
            <h2>congratulations!!!</h2>
            <p>here's your amazing reward</p>
            <div className={styles.codeDisplay}>
              <p className={styles.codeLabel}>$50 brandy gift card : )</p>
              <p className={styles.codeValue}>{SECRET_CODE}</p>
            </div>
          </div>
        )}

        <button
          className={styles.backButton}
          onClick={() => router.push("/iloveyou")}
        >
          Back to I Love You
        </button>
      </div>
    </main>
  );
}
