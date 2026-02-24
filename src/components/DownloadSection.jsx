import useIntersectionObserver from "../hooks/useIntersectionObserver";

const downloadMeta = {
  title: "Next.js Roaster App",
  platform: "Next.js • Vercel • PWA",
  copy:
    "Install the Resume Roaster like an app—uses Next.js for instant routing, API hooks, and a configured download flow. Works on desktop and mobile through the same build.",
  command: "npx create-next-app resume-roaster && npm install && npm run dev"
};

const DownloadSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`section download-section ${isVisible ? "reveal is-visible" : "reveal"}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div>
          <p className="label-badge">App Download</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white">
            Download the Resume Roaster for your device
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium text-textSecondary">
            Configure the Next.js-native app, drop your PDFs straight into the drag zone, and keep roasting with the API you already trust.
          </p>
        </div>
        <article className="download-card single">
          <span className="download-icon" aria-hidden="true">
            ⚡
          </span>
          <div>
            <p className="download-platform">{downloadMeta.platform}</p>
            <h3 className="download-title">{downloadMeta.title}</h3>
            <p className="download-copy">{downloadMeta.copy}</p>
            <div className="download-cta-group">
              <button type="button" className="download-cta">
                Download App
              </button>
              <p className="download-hint">Next.js config + Vercel deploy ready</p>
              <code className="download-command">{downloadMeta.command}</code>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default DownloadSection;
