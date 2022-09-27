/**
 * for use as argument to Array.Prototype.flatMap() to simultanously filter and map items
 * 
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 */

const irrelevantSubstrings = ["zahlen", "summe", "total", "datum", "stk"]

export default function toFilteredStr(str: string): string[] {

    const lowerStr = str.toLowerCase();

    if (irrelevantSubstrings.some(i => lowerStr.includes(i))) return []

    const filteredString = lowerStr
        .replace(/[^a-zA-ZäÄöÖüÜ0-9\/\-,\.\s]+/g, '')
        .replace(/\s\s+/g, ' ')
        .trim();

    if (!/[0-9]/g.test(filteredString)) return []

    if (!/[a-zA-Z]/g.test(filteredString)) return []

    if (!/[0-9]+\.[0-9]+/.test(filteredString.replace(',', '.'))) return []

    const cleanedStr = str
        // Remove all non-text characters
        .replace(/[^a-zA-ZäÄöÖüÜ\/\-\s]+/g, '')
        // Remove all double spaces
        .replace(/\s\s+/g, ' ')
        // Remove single characters
        .replace(/\s[a-zA-ZäÄöÖüÜ0-9]\s/g, ' ')
        .replace(/\s[a-zA-ZäÄöÖüÜ0-9]$/g, ' ')
        .replace(/^[a-zA-ZäÄöÖüÜ0-9]\s/g, ' ')
        // other adjustment
        .replace(/^[eE][a-zA-ZäÄöÖüÜ]*\s/, 'ein ')
        .trim();

    return [cleanedStr]
}