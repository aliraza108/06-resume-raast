import useIntersectionObserver from "../hooks/useIntersectionObserver";

const downloadOptions = [
  {
    title: "Mobile Roaster",
    platform: "iOS + Android",
    copy: "Carry the roast wherever you go—scan from your phone and get instant heat.",
    action: "Get Mobile App",
    hint: "Push notifications for fresh burns"
  },
  {
    title: "Desktop Workbench",
    platform: "Windows + macOS",
    copy: "Drop PDFs, toggle savage modes, and mass roast from your home rig.",
    action: "Download Desktop",
    hint: "Offline mode + drag-and-drop convenience"
  }
];

const DownloadSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`section download-section ${isVisible ? "reveal is-visible" : "reveal"}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div>
          <p className="label-badge">App Ready</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white">
            Download the Resume Roaster for your device
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium text-textSecondary">
            Switch from browser to a dedicated app for faster uploads, background roasts, and
            push-loaded savage feedback.
          </p>
        </div>
        <div className="download-grid">
          {downloadOptions.map((option) => (
            <article key={option.title} className="download-card">
              <p className="download-platform">{option.platform}</p>
              <h3 className="download-title">{option.title}</h3>
              <p className="download-copy">{option.copy}</p>
              <p className="download-hint">{option.hint}</p>
              <button type="button" className="download-cta">
                {option.action}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
