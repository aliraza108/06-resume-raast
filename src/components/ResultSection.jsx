import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useTypewriter from "../hooks/useTypewriter";

const ResultSection = ({ result, error, onRoastAgain }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const rawRoast =
    result?.roast ||
    result?.roast_text ||
    result?.response ||
    result?.message ||
    "";
  const fallbackOutput =
    result && !rawRoast
      ? `\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``
      : rawRoast;
  const outputText = rawRoast || fallbackOutput;
  const typeSpeed = outputText.length > 1600 ? 8 : 18;
  const { displayed } = useTypewriter(outputText, typeSpeed, Boolean(result));
  const [copied, setCopied] = useState(false);

  const chips = useMemo(() => {
    if (!result) return [];
    return [
      { label: "File", value: result.file || "resume.pdf" },
      { label: "Level", value: result.roast_level },
      { label: "Role", value: result.role_type },
      { label: "Language", value: result.language }
    ];
  }, [result]);

  useEffect(() => {
    setCopied(false);
  }, [outputText]);

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  const handleShare = (platform) => {
    if (!outputText) return;
    const text = encodeURIComponent(outputText);
    const url = encodeURIComponent(window.location.href);
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };
    const shareUrl = links[platform];
    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  if (!result && !error) return null;

  return (
    <section
      id="results"
      ref={ref}
      className={`section ${isVisible ? "reveal is-visible" : "reveal"}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="label-badge">Results</p>
        <h2 className="mt-4 font-heading text-3xl font-bold text-white">
          Your roast just landed.
        </h2>

        {error ? (
          <div className="error-card mt-8">
            <h3 className="text-xl font-bold text-white">😭 Roast failed</h3>
            <p className="mt-3 text-sm text-textSecondary">
              {error}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span key={chip.label} className="chip">
                  <span className="chip-label">{chip.label}</span>
                  <span className="chip-value">{chip.value}</span>
                </span>
              ))}
            </div>

            <div className="result-card mt-8">
              <ReactMarkdown className="markdown-body">{displayed}</ReactMarkdown>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button type="button" className="secondary-button" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy Roast 📋"}
              </button>
              <button type="button" className="secondary-button" onClick={onRoastAgain}>
                Roast Again 🔄
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-sm uppercase tracking-[0.3em] text-textSecondary">
                Share your roast
              </span>
              <button
                type="button"
                className="share-button"
                onClick={() => handleShare("twitter")}
              >
                Twitter
              </button>
              <button
                type="button"
                className="share-button"
                onClick={() => handleShare("whatsapp")}
              >
                WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ResultSection;
