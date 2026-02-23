export function abbreviateNameInitials(fullName) {
    if (typeof fullName !== 'string' || !fullName) {
        return '';
    }
    const initials = fullName
        .trim()
        .split(/\s+/) // Split by one or more spaces
        .map(word => word[0]) // Get the first letter of each word
        .join('.') // Join with a dot
        .toUpperCase(); // Capitalize all initials
    return initials;
}
