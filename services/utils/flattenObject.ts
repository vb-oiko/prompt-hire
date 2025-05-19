export function flattenObject(obj: any, prefix = ""): Record<string, string> {
  if (obj === null || obj === undefined) {
    return {};
  }

  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    const pre = prefix.length ? `${prefix}.` : "";

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenObject(obj[key], pre + key));
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any, index: number) => {
        if (typeof item === "object" && item !== null) {
          Object.assign(acc, flattenObject(item, `${pre}${key}[${index}]`));
        } else {
          acc[`${pre}${key}[${index}]`] = item;
        }
      });
    } else {
      acc[pre + key] = obj[key];
    }

    return acc;
  }, {});
}
