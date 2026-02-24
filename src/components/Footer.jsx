import useIntersectionObserver from "../hooks/useIntersectionObserver";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/aliraza108",
    emoji: "🐙"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/aliraza_ai",
    emoji: "✖️"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61576883505330",
    emoji: "📘"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/raza-abro/",
    emoji: "💼"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/aliraza.xyz/",
    emoji: "📸"
  }
];

const Footer = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className={`mt-24 border-t border-white/10 py-12 ${
        isVisible ? "reveal is-visible" : "reveal"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <div className="footer-line" />

        <div className="footer-icons">
          {socials.map((social) => (
            <a
              key={social.name}
              className="icon-button"
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
            >
              <span aria-hidden="true">{social.emoji}</span>
            </a>
          ))}
        </div>

        <div className="w-full">
          <p className="label-badge">🌐 Social Profiles</p>
          <div className="social-grid mt-6">
            {socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="social-card"
              >
                <span className="social-emoji" aria-hidden="true">
                  {social.emoji}
                </span>
                <span className="social-name">{social.name}</span>
                <span className="social-url">{social.url}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="label-badge">📧 Email</p>
          <div className="email-card mt-5">
            <span className="social-emoji" aria-hidden="true">
              📧
            </span>
            <a className="email-link" href="mailto:razaabro.dev@gmail.com">
              razaabro.dev@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-textSecondary">
          <p>Developed by Ali Raza</p>
          <p>Built with 🔥 + FastAPI + Gemini AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
