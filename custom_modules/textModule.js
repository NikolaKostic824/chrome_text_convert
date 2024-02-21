/**
 * Converts text to lowercase.
 * @param {string} text - The text to be converted.
 * @returns {string} - The text converted to lowercase.
 */
const convertToLowercase = (text) => text.toLowerCase();

/**
 * Converts text to UPPERCASE.
 * @param {string} text - The text to be converted.
 * @returns {string} - The text converted to UPPERCASE.
 */
const convertToUppercase = (text) => text.toUpperCase();

/**
 * Converts text to camelCase.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to camelCase.
 */
const convertToCamelCase = (input) => {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .trim();
};

/**
 * Converts text to snake_case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to snake_case.
 */
const convertToSnakeCase = (input) => {
  return input
    .toLowerCase() // Convert input to lowercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9_]+/g, ""); // Remove non-alphanumeric characters except underscores
};

/**
 * Converts text to Sentence case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to Sentence case.
 */
const convertToSentenceCase = (input) => {
  return input
    .toLowerCase() // Convert input to lowercase
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase()); // Capitalize first letter of each sentence
};

/**
 * Converts text to capital case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to Capital Case.
 */
const convertToCapitalCase = (input) => {
  return input
    .toLowerCase() // Convert input to lowercase
    .split(" ") // Split the input into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join the words back together
};

/**
 * Converts text to PascalCase.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to PascalCase.
 */
const convertToPascalCase = (input) => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

/**
 * Converts text to kebab-case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to kebab-case.
 */
const convertToKebabCase = (input) => {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

/**
 * Converts text to Title Case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to Title Case.
 */
const convertToTitleCase = (input) => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Converts text to CONSTANT_CASE.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to CONSTANT_CASE.
 */
const convertToConstantCase = (input) => {
  return input
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z0-9_]/g, "");
};

/**
 * An array of objects representing different text conversion functions.
 * Each object in the array contains a name and a function (`func`) that performs a specific text conversion.
 *
 * @type {Array.<{name: string, func: Function}>}
 * @exports
 *
 * @example
 * // How to use a conversion function
 * const text = "Some Example Text";
 * const lowercaseText = conversionFunctions.find(func => func.name === "Lowercase").func(text);
 * console.log(lowercaseText); // Outputs: "some example text"
 *
 * @example
 * // Iterating over all conversion functions and applying them to a string
 * conversionFunctions.forEach(({ name, func }) => {
 *   console.log(`Conversion: ${name}, Result: ${func(text)}`);
 * });
 *
 * Available conversions:
 * - Lowercase: Converts all characters in the text to lowercase.
 * - Uppercase: Converts all characters in the text to uppercase.
 * - Camel Case: Converts text to camelCase.
 * - Snake Case: Converts text to snake_case.
 * - Sentence Case: Converts text to Sentence case, where the first letter of each sentence is capitalized.
 * - Capital Case: Converts text so that the first character of each word is capitalized.
 * - Pascal Case: Converts text to PascalCase.
 * - Kebab Case: Converts text to kebab-case.
 * - Title Case: Converts text to Title Case, where the first character of each word is capitalized, similar to Capital Case.
 * - Constant Case: Converts text to CONSTANT_CASE, where all letters are uppercase and words are separated by underscores.
 */
export const conversionFunctions = [
  { name: "Lowercase", func: convertToLowercase },
  { name: "Uppercase", func: convertToUppercase },
  { name: "Camel Case", func: convertToCamelCase },
  { name: "Snake Case", func: convertToSnakeCase },
  { name: "Sentence Case", func: convertToSentenceCase },
  { name: "Capital Case", func: convertToCapitalCase },
  { name: "Pascal Case", func: convertToPascalCase },
  { name: "Kebab Case", func: convertToKebabCase },
  { name: "Title Case", func: convertToTitleCase },
  { name: "Constant Case", func: convertToConstantCase },
];
