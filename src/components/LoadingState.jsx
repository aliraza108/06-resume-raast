import { useEffect, useState } from "react";

const messages = [
  "Scanning your trauma...",
  "Judging your font choices...",
  "Consulting the unemployment office...",
  "This might hurt..."
];

const LoadingState = ({ isLoading }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return undefined;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) setIndex(0);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="mt-10">
      <div className="loading-bar" />
      <div className="mt-6 flex items-center gap-4 text-textSecondary">
        <span className="text-3xl animate-spin-slow">🔥</span>
        <p className="loading-message text-sm font-medium">
          {messages[index]}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
