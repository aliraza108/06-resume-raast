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
      className={`relative min-h-screen overflow-hidden px-6 pt-20 pb-16 ${
        isVisible ? "reveal is-visible" : "reveal"
      }`}
    >
      <div className="hero-mesh" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
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

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 text-white">
        <div className="hero-grid">
          <div className="hero-info">
            <p className="label-badge">Gen Z Roast Engine</p>
            <h1 className="font-heading text-5xl font-extrabold leading-tight text-white lg:text-7xl">
              <span className="gradient-text">{displayed}</span>
              <span className="typing-cursor" aria-hidden="true" />
            </h1>
            <p className="hero-subtext mt-6 text-base font-medium text-textSecondary md:text-lg">
              Drop your PDF. Get brutally honest AI feedback in seconds. No cap, no mercy.
            </p>
            <div className="hero-cta-group mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={scrollToUpload}
                className="cta-button rounded-[4px] bg-hotGlow px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white shadow-neon transition duration-300 hover:scale-[1.03]"
              >
                RoaSt Me
              </button>
              <span className="hero-note text-sm font-semibold text-textSecondary uppercase tracking-[0.4em]">
                API-powered | Gemini AI vibe
              </span>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <p className="hero-panel-label">Live Roasts</p>
              <p className="hero-panel-subtitle">Zero fluff</p>
            </div>
            <div className="hero-panel-stats">
              <div className="hero-stat">
                <span className="stat-value">4.8s</span>
                <span className="stat-label">Avg roast time</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">16</span>
                <span className="stat-label">Savage prompts</span>
              </div>
            </div>
            <ul className="hero-highlights">
              <li>Typewriter-grade burns</li>
              <li>Pick your roast vibe</li>
              <li>Share your heatwave</li>
            </ul>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span className="text-xs uppercase tracking-[0.4em] text-textSecondary">Scroll</span>
          <span className="hero-arrow">↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
