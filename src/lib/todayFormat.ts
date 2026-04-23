import i18n from "@/i18n";

export function todayFormat() {
  const locale = i18n.language;
  const date = new Date();

  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(date);

  const day = date.getDate();

  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
  }).format(date);

  const today = `${weekday[0].toUpperCase() + weekday.slice(1)}, ${day} ${
    month[0].toUpperCase() + month.slice(1)
  }`;

  return today;
}
