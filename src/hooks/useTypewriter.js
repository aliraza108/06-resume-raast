import { useEffect, useState } from "react";

const useTypewriter = (text, speed = 20, start = true) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) {
      setDisplayed("");
      return undefined;
    }

    setDisplayed("");
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start]);

  return {
    displayed,
    isDone: displayed.length >= text.length
  };
};

export default useTypewriter;
