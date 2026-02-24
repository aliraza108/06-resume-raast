import useIntersectionObserver from "../hooks/useIntersectionObserver";

const steps = [
  {
    title: "📤 Upload PDF",
    text: "Drop your resume and let the chaos begin."
  },
  {
    title: "🎭 Pick Your Vibe",
    text: "Choose how savage you want the roast to be."
  },
  {
    title: "🔥 Get Roasted",
    text: "Receive brutally honest feedback in seconds."
  }
];

const HowCard = ({ title, text, delay }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`glass-card reveal p-6 transition duration-700 hover:scale-[1.03] hover:shadow-neon ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-4 text-sm font-medium text-textSecondary">{text}</p>
    </div>
  );
};

const HowItWorks = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`section ${isVisible ? "reveal is-visible" : "reveal"}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="label-badge">How It Works</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-white">
            Three steps. Zero mercy.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <HowCard
              key={step.title}
              title={step.title}
              text={step.text}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
