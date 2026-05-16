document.addEventListener('DOMContentLoaded', function() {

    /**
     * Inject Order Online button over MetaSlider
     */
    function injectSliderButton() {
        const slider = document.querySelector('#metaslider-id-105');
        if (!slider) return;

        // Don't inject twice
        if (slider.querySelector('.sj-slider-btn-wrapper')) return;

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'sj-slider-btn-wrapper';

        // Create button link
        const btnPrimary = document.createElement('a');
        btnPrimary.href = 'https://simplyjerkjamaicangrill.cloveronline.com/menu/all';
        btnPrimary.target = '_blank';
        btnPrimary.rel = 'noopener noreferrer';
        btnPrimary.className = 'sj-banner-btn-primary';
        btnPrimary.textContent = 'Order Online';

        // Assemble and inject
        wrapper.appendChild(btnPrimary);
        slider.appendChild(wrapper);

        console.log('SJ: Slider button injected');
    }

        /**
     * Position button in vertical center of slider
     * minus caption height
     */
    function positionSliderButton() {
        const slider = document.querySelector('#metaslider-id-105');
        if (!slider) return;

        const wrapper = slider.querySelector('.sj-slider-btn-wrapper');
        if (!wrapper) return;

        const caption = slider.querySelector('.caption-wrap');
        const sliderHeight = slider.offsetHeight;
        const captionHeight = caption ? caption.offsetHeight : 60;
        const viewportWidth = window.innerWidth;

        // Available height = slider height minus caption
        const availableHeight = sliderHeight - captionHeight;

        // Center button in available area
        const buttonTop = availableHeight / 2;

        // Apply positioning
        wrapper.style.setProperty('top', '0', 'important');
        wrapper.style.setProperty('left', '0', 'important');
        wrapper.style.setProperty('right', '0', 'important');
        wrapper.style.setProperty('bottom', captionHeight + 'px', 'important');
        wrapper.style.setProperty('height', availableHeight + 'px', 'important');
        wrapper.style.setProperty('width', '100%', 'important');
        wrapper.style.setProperty('display', 'flex', 'important');
        wrapper.style.setProperty('align-items', 'center', 'important');
        wrapper.style.setProperty('justify-content', 'center', 'important');
        wrapper.style.setProperty('position', 'absolute', 'important');
        wrapper.style.setProperty('pointer-events', 'none', 'important');
        wrapper.style.setProperty('z-index', '20', 'important');

        // Hide button on very small screens where 
        // it would still overlap
        const btn = wrapper.querySelector('.sj-banner-btn-primary');
        if (btn) {
            if (viewportWidth < 319) {
                btn.style.setProperty('display', 'none', 'important');
            } else {
                btn.style.setProperty('display', 'inline-block', 'important');
                btn.style.setProperty('pointer-events', 'all', 'important');
            }
        }

        // Debug log
        console.log('SJ Slider:', {
            viewportWidth,
            sliderHeight,
            captionHeight,
            availableHeight,
            buttonTop
        });
    }

    // Run injection first
    injectSliderButton();

    // Position after injection and slider init
    setTimeout(function() {
        positionSliderButton();
    }, 300);

    setTimeout(function() {
        positionSliderButton();
    }, 600);

    setTimeout(function() {
        positionSliderButton();
    }, 1000);

    // Reposition on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            positionSliderButton();
        }, 150);
    });

    // Reposition on slider slide change
    if (typeof jQuery !== 'undefined') {
        jQuery('#metaslider-id-105').on(
            'ms.after ms.init ms.play',
            function() {
                positionSliderButton();
            }
        );
    }

});


