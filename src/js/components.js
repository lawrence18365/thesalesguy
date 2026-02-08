/**
 * Component Loader - Dynamically loads header and footer components
 * This eliminates code duplication across all HTML files
 */

// Load component HTML from external file
async function loadComponent(componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Component loading error:', error);
        return '';
    }
}

// Initialize all components when DOM is ready
async function initComponents() {
    // Load and inject header
    const headerPlaceholder = document.getElementById('header-component');
    if (headerPlaceholder) {
        const headerHTML = await loadComponent('components/header.html');
        headerPlaceholder.outerHTML = headerHTML;

        // Reinitialize header functionality after injection
        if (typeof initMobileMenu === 'function') {
            initMobileMenu();
        }
        if (typeof initHideOnScroll === 'function') {
            initHideOnScroll();
        }
    }

    // Load and inject footer
    const footerPlaceholder = document.getElementById('footer-component');
    if (footerPlaceholder) {
        const footerHTML = await loadComponent('components/footer.html');
        footerPlaceholder.outerHTML = footerHTML;
    }
}

// Run component initialization before other scripts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
} else {
    initComponents();
}
