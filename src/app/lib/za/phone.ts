export const normalizeDigits = (s: string) => s.replace(/\D+/g, "");

// Format SA numbers as +27 82 123 4567 or keep partial gracefully
export const formatPhoneZA = (input: string): string => {
  let s = input.trim();
  // Replace leading 0 with +27
  if (s.startsWith("0")) s = "+27" + s.slice(1);
  if (!s.startsWith("+27")) {
    // if user typed digits without +27, assume ZA when length looks like 10
    const digits = normalizeDigits(s);
    if (digits.length >= 9 && digits.length <= 11) {
      s = "+27" + (digits.startsWith("27") ? digits.slice(2) : digits.replace(/^0/, ""));
    }
  }
  const digits = normalizeDigits(s.replace("+27", ""));
  const parts = [] as string[];
  if (digits.length === 0) return "+27 ";
  // group: 2 3 4 e.g., 82 123 4567
  const g1 = digits.slice(0, 2);
  const g2 = digits.slice(2, 5);
  const g3 = digits.slice(5, 9);
  if (g1) parts.push(g1);
  if (g2) parts.push(g2);
  if (g3) parts.push(g3);
  return "+27 " + parts.join(" ");
};

export const isValidPhoneZA = (input: string): boolean => {
  const digits = normalizeDigits(input);
  // Accept starting with 0 or 27 and total 11 or 12 including country code
  // Typical mobile: 0 7x xxx xxxx -> 10 digits local
  // With +27: 27 7x xxx xxxx -> 11 digits after +
  if (digits.startsWith("27")) return digits.length === 11;
  if (digits.startsWith("0")) return digits.length === 10;
  return false;
};
