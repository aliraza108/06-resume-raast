import { useRef, useState } from "react";
import LoadingState from "./LoadingState";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const roastLevels = ["Light", "Medium", "Savage", "Brutal"];
const roastStatuses = ["Success", "Failure"];
const roleTypes = ["Friend", "Recruiter", "CEO", "Comedian"];
const languages = ["English", "Urdu", "Hindi", "Spanish", "French"];

const UploadSection = ({
  file,
  setFile,
  settings,
  setSettings,
  onSubmit,
  isLoading
}) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleFileChange = (event) => {
    const selected = event.target.files && event.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files && event.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleSubmit = () => {
    if (isLoading) return;
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
    onSubmit();
  };

  const buttonText =
    settings.roastLevel === "Brutal" ? "💀 DESTROY ME" : "🔥 ROAST MY RESUME";

  return (
    <section id="upload" ref={ref} className={`section ${isVisible ? "reveal is-visible" : "reveal"}`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label-badge">Main Tool</p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-white">
              Upload. Configure. Get flamed.
            </h2>
          </div>
          <span className="badge">Powered by Gemini AI</span>
        </div>

        <div className="main-tool-shell mt-10">
          <div className="main-tool-outline" aria-hidden="true" />
          <div className="main-tool-content">
            <div
              className={`dropzone ${dragActive || file ? "dropzone-active" : ""}`}
              style={{
                "--dash-color": dragActive || file ? "#00F5D4" : "rgba(255,255,255,0.35)"
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current && inputRef.current.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  inputRef.current && inputRef.current.click();
                }
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {file ? "PDF locked in ✅" : "Drop it like it's hot 🔥"}
                </p>
                <p className="mt-2 text-sm text-textSecondary">
                  {file ? file.name : "Drag & drop or click to browse"}
                </p>
                <div className="dropzone-emojis">🔥😭💀🔥💀🔥😭💀</div>
              </div>
            </div>

            <div className="main-tool-lowdown">
              <p className="text-sm uppercase tracking-[0.3em] text-textSecondary">PDF Upload</p>
              <p className="text-xl font-bold text-white">Roast level: {settings.roastLevel}</p>
              <p className="text-sm text-textSecondary">
                Drop your PDF, pick a vibe, then hit the roast trigger—this is the duel arena.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="control-card">
            <p className="control-label">Roast Level</p>
            <div className="segmented-group mt-4">
              {roastLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSettings({ ...settings, roastLevel: level })}
                  className={`control-pill ${settings.roastLevel === level ? "is-selected" : ""}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="control-card">
            <p className="control-label">Roast Status</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {roastStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSettings({ ...settings, roastStatus: status })}
                  className={`control-pill ${settings.roastStatus === status ? "is-selected" : ""}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="control-card">
            <p className="control-label">Role Type</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {roleTypes.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSettings({ ...settings, roleType: role })}
                  className={`control-pill ${settings.roleType === role ? "is-selected" : ""}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="control-card">
            <p className="control-label">Language</p>
            <select
              value={settings.language}
              onChange={(event) =>
                setSettings({ ...settings, language: event.target.value })
              }
              className="select-field mt-4"
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`cta-button w-full ${isShaking ? "animate-shake" : ""}`}
          >
            {isLoading ? "ROASTING..." : buttonText}
          </button>
        </div>

        <LoadingState isLoading={isLoading} />
      </div>
    </section>
  );
};

export default UploadSection;
