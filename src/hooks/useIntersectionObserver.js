import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.2,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = true
  } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (isVisible && freezeOnceVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (freezeOnceVisible) observer.unobserve(entry.target);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return { ref, isVisible };
};

export default useIntersectionObserver;
