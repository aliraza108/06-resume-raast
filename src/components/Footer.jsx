import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Footer = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className={`mt-24 border-t border-white/10 py-10 ${
        isVisible ? "reveal is-visible" : "reveal"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <div className="footer-line" />
        <p className="text-sm text-textSecondary">
          Built with 🔥 + FastAPI + Gemini AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
