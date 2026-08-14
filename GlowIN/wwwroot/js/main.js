/* =========================================================
   GLOWIN PREMIUM LOADER
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SETTINGS
       ===================================================== */

    const GLOWIN_LOADER_MIN_TIME = 4000;

    const GLOWIN_LOADER_FADE_TIME = 800;


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initializeGlowINLoader() {

        const loader =
            document.getElementById("glowinloader");


        /* Loader doesn't exist */
        if (!loader) {

            return;

        }


        /*
         * Record the exact time when
         * the loader became visible.
         */

        const loaderStartTime =
            performance.now();


        /*
         * Keep page in loading state.
         */

        document.documentElement.classList.add(
            "glowinloader-page-loading"
        );


        /*
         * Wait until the entire page
         * has finished loading.
         */

        function hideGlowINLoader() {

            const elapsedTime =
                performance.now() -
                loaderStartTime;


            /*
             * Calculate remaining time.
             *
             * Example:
             *
             * Loader visible for 1500ms
             * Minimum = 4000ms
             *
             * Remaining = 2500ms
             */

            const remainingTime =
                Math.max(
                    0,
                    GLOWIN_LOADER_MIN_TIME -
                    elapsedTime
                );


            setTimeout(function () {

                /*
                 * Start fade-out
                 */

                loader.classList.add(
                    "glowinloader--hidden"
                );


                document.documentElement.classList.remove(
                    "glowinloader-page-loading"
                );


                /*
                 * Accessibility
                 */

                loader.setAttribute(
                    "aria-hidden",
                    "true"
                );


                /*
                 * Remove loader from
                 * display after fade.
                 */

                setTimeout(function () {

                    loader.style.display =
                        "none";

                }, GLOWIN_LOADER_FADE_TIME);


            }, remainingTime);

        }


        /*
         * If page has already loaded,
         * hide loader after minimum time.
         */

        if (document.readyState === "complete") {

            hideGlowINLoader();

        }
        else {

            window.addEventListener(
                "load",
                hideGlowINLoader,
                {
                    once: true
                }
            );

        }

    }


    /* =====================================================
       DOM READY
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeGlowINLoader,
            {
                once: true
            }
        );

    }
    else {

        initializeGlowINLoader();

    }

})();


/* =========================================================
   STICKY NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar =
    document.querySelector(".glowinhomepage-navbar");

window.addEventListener("scroll", function () {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add(
            "glowinhomepage-navbar-scrolled"
        );

    } else {

        navbar.classList.remove(
            "glowinhomepage-navbar-scrolled"
        );

    }

});

/* =========================================================
   GLOWIN GLOBAL CART BADGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    function updateGlobalCartBadge() {

        let cart = [];


        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "glowinCart"
                    )
                ) || [];

        } catch (error) {

            cart = [];

        }


        const totalQuantity =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(item.quantity);

                },
                0
            );


        const badges =
            document.querySelectorAll(
                "#glowinhomepageCartCount"
            );


        badges.forEach(function (badge) {

            badge.textContent =
                totalQuantity;

        });

    }


    updateGlobalCartBadge();

});