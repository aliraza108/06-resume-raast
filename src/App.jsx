import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import UploadSection from "./components/UploadSection";
import ResultSection from "./components/ResultSection";
import Footer from "./components/Footer";

const initialSettings = {
  roastLevel: "Medium",
  roastStatus: "Success",
  roleType: "Recruiter",
  language: "English"
};

const App = () => {
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult(null);
    setIsLoading(true);

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("roast_level", settings.roastLevel);
    formData.append("roast_status", settings.roastStatus);
    formData.append("role_type", settings.roleType);
    formData.append("language", settings.language);

    try {
      const response = await fetch(
        "https://06-resumeroaster-api.vercel.app/roast",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        "The roast engine tripped. Try again, or swap your PDF if it's cursed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoastAgain = () => {
    setResult(null);
    setError("");
    const target = document.getElementById("upload");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (result || error) {
      const target = document.getElementById("results");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  }, [result, error]);

  return (
    <div className="min-h-screen bg-primary text-textPrimary">
      <Hero />
      <HowItWorks />
      <UploadSection
        file={file}
        setFile={setFile}
        settings={settings}
        setSettings={setSettings}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <ResultSection result={result} error={error} onRoastAgain={handleRoastAgain} />
      <Footer />
    </div>
  );
};

export default App;
