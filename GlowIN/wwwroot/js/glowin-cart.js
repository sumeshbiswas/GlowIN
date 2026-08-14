/* =========================================================
   GLOWIN CART
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       GLOBAL CART BADGE
       This works on every page
       ===================================================== */

    function updateGlobalCartBadge() {

        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem("glowinCart")
                ) || [];

        }
        catch (error) {

            cart = [];

        }


        const totalQuantity =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(item.quantity || 0);

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


    /* =====================================================
       UPDATE BADGE
       ===================================================== */

    updateGlobalCartBadge();


    /* =====================================================
       CART PAGE ELEMENTS
       ===================================================== */

    const cartItemsContainer =
        document.getElementById(
            "glowincartItems"
        );


    const emptyCart =
        document.getElementById(
            "glowincartEmpty"
        );


    const cartSummary =
        document.getElementById(
            "glowincartSummary"
        );


    const subtotalElement =
        document.getElementById(
            "glowincartSubtotal"
        );


    const totalElement =
        document.getElementById(
            "glowincartTotal"
        );


    const checkoutButton =
        document.getElementById(
            "glowincartCheckout"
        );


    /* =====================================================
       IMPORTANT SAFETY CHECK
       
       glowin-cart.js is loaded from _Layout.cshtml,
       so it runs on every page.

       If this is NOT the Cart page,
       stop the Cart-page code here.
       ===================================================== */

    if (!cartItemsContainer) {

        return;

    }


    /* =====================================================
       GET CART
       ===================================================== */

    function getCart() {

        const storedCart =
            localStorage.getItem(
                "glowinCart"
            );


        if (!storedCart) {

            return [];

        }


        try {

            return JSON.parse(
                storedCart
            );

        }
        catch (error) {

            console.error(
                "GlowIN cart could not be loaded.",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE CART
       ===================================================== */

    function saveCart(cart) {

        localStorage.setItem(
            "glowinCart",
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       FORMAT PRICE
       ===================================================== */

    function formatPrice(price) {

        return "₹" +
            Number(price || 0)
                .toLocaleString("en-IN");

    }


    /* =====================================================
       RENDER CART
       ===================================================== */

    function renderCart() {

        const cart =
            getCart();


        /* ---------------------------------------------
           CLEAR ITEMS
        --------------------------------------------- */

        cartItemsContainer.innerHTML = "";


        /* ---------------------------------------------
           EMPTY CART
        --------------------------------------------- */

        if (cart.length === 0) {

            if (emptyCart) {

                emptyCart.style.display =
                    "block";

            }


            if (cartSummary) {

                cartSummary.style.display =
                    "none";

            }


            updateGlobalCartBadge();

            return;

        }


        /* ---------------------------------------------
           SHOW CART SUMMARY
        --------------------------------------------- */

        if (emptyCart) {

            emptyCart.style.display =
                "none";

        }


        if (cartSummary) {

            cartSummary.style.display =
                "block";

        }


        /* ---------------------------------------------
           RENDER ITEMS
        --------------------------------------------- */

        cart.forEach(
            function (item, index) {


                const itemElement =
                    document.createElement(
                        "article"
                    );


                itemElement.className =
                    "glowincart__item";


                itemElement.innerHTML = `

                    <div class="glowincart__item-image">

                        <img
                            src="${item.imageUrl || ""}"
                            alt="${item.productName || "Product"}"
                            loading="lazy">

                    </div>


                    <div class="glowincart__item-info">

                        <span class="glowincart__item-category">

                            ${item.category || ""}

                        </span>


                        <h2 class="glowincart__item-name">

                            ${item.productName || "Product"}

                        </h2>


                        <p class="glowincart__item-size">

                            Size:
                            ${item.size || "Standard"}

                        </p>


                        <div class="glowincart__item-price">

                            ${formatPrice(item.price)}

                        </div>


                        <div class="glowincart__item-controls">


                            <div class="glowincart__quantity">


                                <button
                                    type="button"
                                    class="glowincart__quantity-minus"
                                    data-index="${index}"
                                    aria-label="Decrease quantity">

                                    <i class="bi bi-dash"></i>

                                </button>


                                <span>

                                    ${item.quantity || 1}

                                </span>


                                <button
                                    type="button"
                                    class="glowincart__quantity-plus"
                                    data-index="${index}"
                                    aria-label="Increase quantity">

                                    <i class="bi bi-plus"></i>

                                </button>


                            </div>


                            <button
                                type="button"
                                class="glowincart__remove"
                                data-index="${index}">

                                Remove

                            </button>


                        </div>

                    </div>


                    <div class="glowincart__item-total">

                        ${formatPrice(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                )}

                    </div>

                `;


                cartItemsContainer.appendChild(
                    itemElement
                );

            }
        );


        updateSummary();

        updateGlobalCartBadge();

    }


    /* =====================================================
       UPDATE SUMMARY
       ===================================================== */

    function updateSummary() {

        const cart =
            getCart();


        const subtotal =
            cart.reduce(
                function (total, item) {

                    return total +
                        (
                            Number(item.price || 0) *
                            Number(item.quantity || 1)
                        );

                },
                0
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                formatPrice(subtotal);

        }


        if (totalElement) {

            totalElement.textContent =
                formatPrice(subtotal);

        }

    }


    /* =====================================================
       QUANTITY / REMOVE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {


            /* =============================================
               PLUS
               ============================================= */

            const plusButton =
                event.target.closest(
                    ".glowincart__quantity-plus"
                );


            if (plusButton) {

                const index =
                    Number(
                        plusButton.dataset.index
                    );


                const cart =
                    getCart();


                if (!cart[index]) {

                    return;

                }


                cart[index].quantity =
                    Number(
                        cart[index].quantity || 1
                    ) + 1;


                saveCart(cart);

                renderCart();

                return;

            }


            /* =============================================
               MINUS
               ============================================= */

            const minusButton =
                event.target.closest(
                    ".glowincart__quantity-minus"
                );


            if (minusButton) {

                const index =
                    Number(
                        minusButton.dataset.index
                    );


                const cart =
                    getCart();


                if (!cart[index]) {

                    return;

                }


                const quantity =
                    Number(
                        cart[index].quantity || 1
                    );


                if (quantity > 1) {

                    cart[index].quantity =
                        quantity - 1;

                }
                else {

                    cart.splice(
                        index,
                        1
                    );

                }


                saveCart(cart);

                renderCart();

                return;

            }


            /* =============================================
               REMOVE
               ============================================= */

            const removeButton =
                event.target.closest(
                    ".glowincart__remove"
                );


            if (removeButton) {

                const index =
                    Number(
                        removeButton.dataset.index
                    );


                const cart =
                    getCart();


                if (!cart[index]) {

                    return;

                }


                cart.splice(
                    index,
                    1
                );


                saveCart(cart);

                renderCart();

            }

        }
    );


    /* =====================================================
       CHECKOUT
       ===================================================== */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (cart.length === 0) {

                    return;

                }


                window.location.href =
                    "/Checkout";

            }
        );

    }


    /* =====================================================
       INITIAL CART LOAD
       ===================================================== */

    renderCart();

});