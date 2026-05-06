import { useTranslation } from "react-i18next";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("landing.testimonials.user1.quote"),
      name: t("landing.testimonials.user1.name"),
      role: t("landing.testimonials.user1.role"),
    },
    {
      quote: t("landing.testimonials.user2.quote"),
      name: t("landing.testimonials.user2.name"),
      role: t("landing.testimonials.user2.role"),
    },
  ];

  return (
    <section className="bg-canvas-parchment py-[80px]" id="testimonials">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-[48px]">
          <h2
            className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1] tracking-[-0.28px] mb-[12px]"
          >
            {t("landing.testimonials.title")}
          </h2>
          <p
            className="text-[21px] font-normal text-ink leading-[1.47] max-w-[680px] mx-auto"
          >
            {t("landing.testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="bg-canvas border border-hairline rounded-[18px] p-[24px]"
            >
              <p
                className="text-[17px] font-normal text-ink leading-[1.47] tracking-[-0.374px] mb-[17px]"
              >
                {testimonial.quote}
              </p>
              <div>
                <p className="text-[14px] font-semibold text-ink leading-[1.29] tracking-[-0.224px]">
                  {testimonial.name}
                </p>
                <p className="text-[14px] font-normal text-ink-muted-48 leading-[1.43] tracking-[-0.224px]">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
