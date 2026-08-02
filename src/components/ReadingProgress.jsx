import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;

    function updateProgress() {
      window.cancelAnimationFrame(animationFrame);

      animationFrame = window.requestAnimationFrame(() => {
        const article = document.getElementById("article-content");

        if (!article) return;

        const articleTop =
          article.getBoundingClientRect().top + window.scrollY;

        const articleBottom =
          articleTop + article.offsetHeight - window.innerHeight;

        const totalDistance = Math.max(
          articleBottom - articleTop,
          1
        );

        const amountRead =
          ((window.scrollY - articleTop) / totalDistance) * 100;

        const limitedProgress = Math.min(
          100,
          Math.max(0, amountRead)
        );

        setProgress(limitedProgress);
      });
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        background: "rgba(24, 33, 47, 0.12)",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "#b88954",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}