const features = [
  {
    id: "stats",
    title: "Deep Visual Analytics",
    description:
      "Uncover patterns in your lifestyle with editorial-grade charts that make data feel like art. See your growth over months, not just days.",
    icon: "insights",
    variant: "large",
  },
  {
    id: "streaks",
    title: "Unbroken Streaks",
    description:
      "Our kinetic feedback system makes maintaining a streak more addictive than your favorite game.",
    icon: "workspace_premium",
    variant: "highlight",
  },
  {
    id: "webhooks",
    title: "Smart Webhooks",
    description:
      "Connect Vitality to your favorite apps. Automate your tracking with Zapier, IFTTT, or your own custom endpoints.",
    icon: "webhook",
  },
  {
    id: "alerts",
    title: "Intentional Alerts",
    description:
      "Gentle nudges based on your circadian rhythm. No more annoying pings at the wrong times.",
    icon: "notifications_active",
  },
  {
    id: "community",
    title: "Social Ecosystems",
    description:
      'Join "Greenhouses"—private communities of friends tracking similar goals without the pressure.',
    icon: "diversity_3",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Engineered for Momentum
        </h2>
        <p className="text-[#35654d] max-w-2xl mx-auto text-lg">
          Powerful tools that feel invisible. Focus on the habit, we'll handle
          the data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="md:col-span-2 bg-[#ffffff] rounded-4xl p-10 flex flex-col justify-between overflow-hidden relative shadow-lg shadow-[#006a35]/5">
          <div className="z-10 max-w-sm">
            <span className="material-symbols-outlined text-4xl text-[#006a35] mb-6 block">
              insights
            </span>
            <h3 className="text-3xl font-bold mb-4">Deep Visual Analytics</h3>
            <p className="text-[#35654d] leading-relaxed mb-8">
              Uncover patterns in your lifestyle with editorial-grade charts
              that make data feel like art. See your growth over months, not
              just days.
            </p>
            <button className="text-[#006a35] font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Explore Stats{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#6bfe9c]/30 rounded-full blur-3xl" />

          <div className="absolute right-10 bottom-10 hidden md:flex w-1/2 aspect-video bg-[#ffffff] rounded-[1.75rem] shadow-lg p-4 items-end gap-2">
            <div className="w-1/6 bg-[#6bfe9c] h-[33%] rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[66%] rounded-full" />
            <div className="w-1/6 bg-[#006a35] h-full rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[50%] rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[75%] rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[33%] rounded-full" />
          </div>
        </article>

        {features.slice(1).map((feature) => (
          <article
            key={feature.id}
            className={`rounded-[1.75rem] p-10 flex flex-col gap-6 ${
              feature.variant === "highlight"
                ? "bg-[#006a35] text-[#cdffd4] text-center items-center justify-center"
                : "bg-[#ffffff]"
            } shadow-sm`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                feature.variant === "highlight"
                  ? "bg-[#7deb9b] text-[#003622]"
                  : "bg-[#abd6ff] text-[#006093]"
              }`}
            >
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3 className="text-2xl font-bold">{feature.title}</h3>
            <p
              className={`${feature.variant === "highlight" ? "text-[#ebf4ff]" : "text-[#35654d]"}`}
            >
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
