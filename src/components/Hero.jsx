import { useMemo } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useTypewriter from "../hooks/useTypewriter";

const Hero = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const headline = "YOUR RESUME. ROASTED. 🔥";
  const { displayed } = useTypewriter(headline, 60, true);

  const particles = useMemo(() => {
    const emojis = ["🔥", "💀", "😭"];
    return Array.from({ length: 18 }, (_, index) => ({
      id: index,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 16 + Math.random() * 28,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 2
    }));
  }, []);

  const scrollToUpload = () => {
    const target = document.getElementById("upload");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className={`relative min-h-screen overflow-hidden px-6 pt-24 pb-16 ${
        isVisible ? "reveal is-visible" : "reveal"
      }`}
    >
      <div className="hero-mesh" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="emoji-particle"
            style={{
              left: particle.left,
              top: particle.top,
              fontSize: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          >
            {particle.emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="label-badge mb-4">GEN Z ROAST ENGINE</p>
        <h1 className="font-heading text-6xl font-extrabold text-white md:text-7xl lg:text-8xl">
          <span className="gradient-text">{displayed}</span>
          <span className="typing-cursor" aria-hidden="true" />
        </h1>
        <p className="mt-6 max-w-2xl text-base font-medium text-textSecondary sm:text-lg">
          Drop your PDF. Get brutally honest AI feedback. No cap.
        </p>
        <button
          type="button"
          onClick={scrollToUpload}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-[4px] bg-hotGlow px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white shadow-neon transition duration-300 hover:scale-[1.03]"
        >
          ROAST ME
        </button>
        <div className="mt-16 flex flex-col items-center text-textSecondary">
          <span className="text-xs uppercase tracking-[0.4em]">Scroll</span>
          <span className="mt-3 text-2xl animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
