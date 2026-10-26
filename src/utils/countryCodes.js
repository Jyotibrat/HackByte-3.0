/**
 * Comprehensive list of international country calling codes.
 */
export const COUNTRY_CALLING_CODES = [
  { code: "+1", country: "United States", iso: "US" },
  { code: "+1", country: "Canada", iso: "CA" },
  { code: "+44", country: "United Kingdom", iso: "GB" },
  { code: "+91", country: "India", iso: "IN" },
  { code: "+61", country: "Australia", iso: "AU" },
  { code: "+43", country: "Austria", iso: "AT" },
  { code: "+880", country: "Bangladesh", iso: "BD" },
  { code: "+32", country: "Belgium", iso: "BE" },
  { code: "+55", country: "Brazil", iso: "BR" },
  { code: "+86", country: "China", iso: "CN" },
  { code: "+57", country: "Colombia", iso: "CO" },
  { code: "+420", country: "Czech Republic", iso: "CZ" },
  { code: "+45", country: "Denmark", iso: "DK" },
  { code: "+20", country: "Egypt", iso: "EG" },
  { code: "+358", country: "Finland", iso: "FI" },
  { code: "+33", country: "France", iso: "FR" },
  { code: "+49", country: "Germany", iso: "DE" },
  { code: "+30", country: "Greece", iso: "GR" },
  { code: "+852", country: "Hong Kong", iso: "HK" },
  { code: "+36", country: "Hungary", iso: "HU" },
  { code: "+62", country: "Indonesia", iso: "ID" },
  { code: "+353", country: "Ireland", iso: "IE" },
  { code: "+972", country: "Israel", iso: "IL" },
  { code: "+39", country: "Italy", iso: "IT" },
  { code: "+81", country: "Japan", iso: "JP" },
  { code: "+254", country: "Kenya", iso: "KE" },
  { code: "+60", country: "Malaysia", iso: "MY" },
  { code: "+52", country: "Mexico", iso: "MX" },
  { code: "+31", country: "Netherlands", iso: "NL" },
  { code: "+64", country: "New Zealand", iso: "NZ" },
  { code: "+234", country: "Nigeria", iso: "NG" },
  { code: "+47", country: "Norway", iso: "NO" },
  { code: "+92", country: "Pakistan", iso: "PK" },
  { code: "+51", country: "Peru", iso: "PE" },
  { code: "+63", country: "Philippines", iso: "PH" },
  { code: "+48", country: "Poland", iso: "PL" },
  { code: "+351", country: "Portugal", iso: "PT" },
  { code: "+974", country: "Qatar", iso: "QA" },
  { code: "+40", country: "Romania", iso: "RO" },
  { code: "+7", country: "Russia", iso: "RU" },
  { code: "+966", country: "Saudi Arabia", iso: "SA" },
  { code: "+65", country: "Singapore", iso: "SG" },
  { code: "+27", country: "South Africa", iso: "ZA" },
  { code: "+82", country: "South Korea", iso: "KR" },
  { code: "+34", country: "Spain", iso: "ES" },
  { code: "+46", country: "Sweden", iso: "SE" },
  { code: "+41", country: "Switzerland", iso: "CH" },
  { code: "+886", country: "Taiwan", iso: "TW" },
  { code: "+66", country: "Thailand", iso: "TH" },
  { code: "+90", country: "Turkey", iso: "TR" },
  { code: "+380", country: "Ukraine", iso: "UA" },
  { code: "+971", country: "United Arab Emirates", iso: "AE" },
  { code: "+84", country: "Vietnam", iso: "VN" },
];

/**
 * Formats phone number digits: after the 5th number is added, a hyphen
 * is automatically added after it (before the 6th number).
 */
export function formatPhoneNumber(inputValue, previousValue = "") {
  if (!inputValue) return "";

  const digits = inputValue.replace(/\D/g, "").slice(0, 15);
  if (!digits) return "";

  // If user hit backspace right after the hyphen:
  if (previousValue.endsWith("-") && inputValue === previousValue.slice(0, -1)) {
    return digits.slice(0, 4);
  }

  if (digits.length >= 5) {
    if (digits.length === 5) {
      return `${digits}-`;
    }
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }

  return digits;
}

/**
 * Strips trailing hyphens and prefixes with country code if phone digits are present.
 */
export function getSanitizedPhoneNumber(phoneNumber, countryCode = "+1") {
  const cleanPhone = (phoneNumber || "").replace(/-+$/, "").trim();
  if (!cleanPhone) return "";
  return countryCode ? `${countryCode.trim()} ${cleanPhone}` : cleanPhone;
}

/**
 * Converts 2-letter ISO country code to Unicode flag emoji.
 */
export function getFlagEmoji(isoCode) {
  if (!isoCode || isoCode.length !== 2) return "";
  const codePoints = isoCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
