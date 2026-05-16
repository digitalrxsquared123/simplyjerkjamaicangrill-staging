/**
 * Simply Jerk Jamaican Grill
 * Menu & Catering page navigation
 *
 * Handles:
 * - Sticky category nav with active state highlight on scroll
 * - Drag-to-scroll on desktop
 * - Auto-scrolls nav to keep active link visible
 * - Works independently on both Menu and Catering pages
 */
 
document.addEventListener('DOMContentLoaded', function () {
 
    /**
     * Initialize a sticky nav instance
     *
     * @param {string} navId       - ID of the nav wrapper element
     * @param {string} categorySelector - CSS selector for category headers
     */
    function initNav(navId, categorySelector) {
 
        const nav = document.getElementById(navId);
        if (!nav) return; // Not on this page
 
        const inner = nav.querySelector('.sj-menu-nav-inner');
        const navLinks = nav.querySelectorAll('.sj-menu-nav-link');
        const categories = document.querySelectorAll(categorySelector);
 
        if (!inner || !navLinks.length || !categories.length) return;
 
        // ======================
        // Drag to scroll on desktop
        // ======================
        let isDown = false;
        let startX;
        let scrollLeft;
 
        inner.addEventListener('mousedown', function (e) {
            isDown = true;
            inner.style.cursor = 'grabbing';
            startX = e.pageX - inner.offsetLeft;
            scrollLeft = inner.scrollLeft;
        });
 
        inner.addEventListener('mouseleave', function () {
            isDown = false;
            inner.style.cursor = 'grab';
        });
 
        inner.addEventListener('mouseup', function () {
            isDown = false;
            inner.style.cursor = 'grab';
        });
 
        inner.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - inner.offsetLeft;
            const walk = (x - startX) * 1.5;
            inner.scrollLeft = scrollLeft - walk;
        });
 
        inner.style.cursor = 'grab';
 
        // ======================
        // Active state on scroll
        // ======================
        function updateActiveLink() {
            const navHeight = nav.offsetHeight;
            const scrollY = window.scrollY;
            let currentId = '';
 
            categories.forEach(function (category) {
                const top = category.getBoundingClientRect().top
                    + scrollY - navHeight - 10;
                if (scrollY >= top) {
                    currentId = category.getAttribute('id');
                }
            });
 
            navLinks.forEach(function (link) {
                link.classList.remove('is-active');
                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('is-active');
 
                    // Scroll nav inner to keep active link visible
                    inner.scrollTo({
                        left: link.offsetLeft - 20,
                        behavior: 'smooth'
                    });
                }
            });
        }
 
        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }
 
    // ======================
    // Menu page
    // Targets: #sj-menu-nav
    // Categories: .sj-menu-category-header[id^="menu-"]
    // ======================
    initNav(
        'sj-menu-nav',
        '.sj-menu-category-header[id^="menu-"]'
    );
 
    // ======================
    // Catering page
    // Targets: #sj-catering-nav
    // Categories: .sj-menu-category-header[id^="catering-"]
    // ======================
    initNav(
        'sj-catering-nav',
        '.sj-menu-category-header[id^="catering-"]'
    );
 
});



/**
 * Mobile sticky nav fallback
 * Uses fixed positioning when CSS sticky fails
 */
function initMobileStickyNav(navId) {
    const nav = document.getElementById(navId);
    if (!nav) return;

    // Only apply on mobile
    if (window.innerWidth > 768) return;

    const navTop = parseInt(
        getComputedStyle(document.documentElement)
            .getPropertyValue('--sj-nav-top')
    ) || 0;

    const navOriginalTop = nav.getBoundingClientRect().top + window.scrollY;

    function handleScroll() {
        if (window.scrollY >= navOriginalTop - navTop) {
            nav.style.position = 'fixed';
            nav.style.top = navTop + 'px';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.width = '100%';
            nav.style.zIndex = '100';
        } else {
            nav.style.position = 'relative';
            nav.style.top = 'auto';
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// Call after DOM ready
initMobileStickyNav('sj-menu-nav');
initMobileStickyNav('sj-catering-nav');
