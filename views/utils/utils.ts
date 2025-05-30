export const formatDate = (date: string) => {
  return date.slice(0, 10);
};

export function getOptionsFromLabelMap(labelMap: Record<string, string>) {
  return Object.entries(labelMap).map(([value, label]) => ({
    label,
    value,
  }));
}

export function formatLinkedin(linkedin: string) {
  return linkedin.replace("https://www.linkedin.com/in/", "").replace("/", "");
}
