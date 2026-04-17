import { useTranslation } from "react-i18next";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("landing.testimonials.user1.quote"),
      name: t("landing.testimonials.user1.name"),
      role: t("landing.testimonials.user1.role"),
      color: "primary",
    },
    {
      quote: t("landing.testimonials.user2.quote"),
      name: t("landing.testimonials.user2.name"),
      role: t("landing.testimonials.user2.role"),
      color: "secondary",
    },
  ];

  return (
    <section
      className="bg-[#f3fff2] py-32 rounded-4xl mx-6 md:mx-12 px-6"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl font-extrabold mb-8 leading-tight">
            {t("landing.testimonials.title")}
          </h2>
          <p className="text-[#35654d] text-lg mb-12 max-w-md">
            {t("landing.testimonials.subtitle")}
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-3">
              <img
                className="w-12 h-12 rounded-full border-4 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLDRNTkD1ylZPQ1bq1YVAaAqxq12YOa67dPb0EajsrwCWqat1X-aPe9eIiqxGvqjguzbfrO3f4IIOQuWDJoSBmqbHmuUdLWdzITgUWhcme2e4Qby_VrsY_U9JeeG3kuvw4auxS5tfrxO41LNz5_jVnfpvu7toJwnZ52crY_8VlzznfXwoIGP2rGybrJaqo0_xvS78ciKzMnWOyibHvQXsxQwY75lSw57uPnGpeUP1waP7vh6zMlx7-2IF2h5Y0Eg_URmRCV82ep-s"
                alt="Usuario 1"
              />
              <img
                className="w-12 h-12 rounded-full border-4 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqm4GuDljybfjBdEiAkFmD7rUZDpeUrn2yS8P2mgHle2gCyNKqXzznP2EUWE_uNUavA-7nJKXwWt5J599iF_ZtwlXLeOvMeeMTnHPxY_QuQsvswcyJOeNwAzawxwMbQlUILQ4FL-ZSVfBwAxl_Vzp900oM2rtKCzvF1t3S83gYpRjcI3MVBIyCtaK0xs3eXfhRaNXN_PAg4-SE7djfYoFSNk_HvImt3IEbM886TIb-1bLtY9N2ARx43q19Ba8_G9EwyOZg6TEF26E"
                alt="Usuario 2"
              />
              <img
                className="w-12 h-12 rounded-full border-4 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9GY3L3QicMQiBBfIdpo7GGSCt3JQc5M3IGEcNGTbNLxevoAX3hWJDphinKJlREqha1QNCnARbibTYVTIPmyc37JjIlVfwam6h8J20NbrRA6AXGT-wlljh-9qSlt_XQ7Xj7iKKU0Vda43sLoVz80Q2yaVkTkoDANVBju9OTbClWUnHNV8MDry-NH7LGEn_J0KRiH8DjkIRwOvFtQTznsIue1-5JeB2IWtJq6JnZ0"
                alt="Usuario 3"
              />
            </div>
            <div className="font-[Manrope] text-sm text-[#35654d]">
              <p className="font-bold text-[#006a35]">
                {t("landing.testimonials.rating")}
              </p>
              <p>{t("landing.testimonials.source")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className={`relative bg-white p-10 rounded-[1.5rem] shadow-sm border-l-8 ${
                testimonial.color === "primary"
                  ? "border-[#006a35]"
                  : "border-[#006093]"
              }`}
            >
              <span className="material-symbols-outlined absolute top-6 right-8 text-[3rem] opacity-20 text-[#006a35]">
                format_quote
              </span>
              <p className="text-xl font-medium mb-8 italic text-[#003622] leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="font-[Manrope]">
                  <p className="font-bold text-[#006a35]">{testimonial.name}</p>
                  <p className="text-xs text-[#35654d] uppercase tracking-[0.28em]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
