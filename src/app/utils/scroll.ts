/**
 * Smoothly scrolls to a section by its element ID.
 * Falls back gracefully if the element doesn't exist.
 */
export function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
