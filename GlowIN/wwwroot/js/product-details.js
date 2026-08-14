/* =========================================================
   GLOWIN PRODUCT DETAILS
   IMAGE GALLERY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const mainImage =
        document.getElementById("glowindetailsMainImage");


    const thumbnails =
        document.querySelectorAll(
            ".glowindetails__thumbnail"
        );


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (!mainImage || thumbnails.length === 0) {
        return;
    }


    /* =====================================================
       THUMBNAIL CLICK
       ===================================================== */

    thumbnails.forEach(function (thumbnail) {

        thumbnail.addEventListener("click", function () {


            const imageUrl =
                this.getAttribute("data-image");


            if (!imageUrl) {
                return;
            }


            /* =============================================
               CHANGE MAIN IMAGE
               ============================================= */

            mainImage.src = imageUrl;


            /* =============================================
               UPDATE ACTIVE THUMBNAIL
               ============================================= */

            thumbnails.forEach(function (item) {

                item.classList.remove(
                    "glowindetails__thumbnail--active"
                );

            });


            this.classList.add(
                "glowindetails__thumbnail--active"
            );

        });

    });

});


/* =========================================================
   GLOWIN PRODUCT DETAILS
   ADD TO CART
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const addToBagButton =
        document.querySelector(
            ".glowindetails__add-bag"
        );


    if (!addToBagButton) {
        return;
    }


    addToBagButton.addEventListener(
        "click",
        function () {


            const productId =
                Number(
                    this.dataset.productId
                );


            if (!productId) {
                return;
            }


            /* =============================================
               PRODUCT INFORMATION
            ============================================= */

            const product = {

                id: productId,

                productName:
                    document.querySelector(
                        ".glowindetails__title"
                    )?.textContent.trim() || "",

                imageUrl:
                    document.querySelector(
                        "#glowindetailsMainImage"
                    )?.getAttribute("src") || "",

                category:
                    document.querySelector(
                        ".glowindetails__category"
                    )?.textContent.trim() || "",

                size:
                    document.querySelector(
                        ".glowindetails__meta-item:nth-child(1) .glowindetails__meta-value"
                    )?.textContent.trim() || "",

                price:
                    getProductPrice(),

                quantity: 1
            };


            /* =============================================
               GET EXISTING CART
            ============================================= */

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


            /* =============================================
               CHECK EXISTING PRODUCT
            ============================================= */

            const existingProduct =
                cart.find(
                    function (item) {

                        return item.id === product.id;

                    }
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push(product);

            }


            /* =============================================
               SAVE
            ============================================= */

            localStorage.setItem(
                "glowinCart",
                JSON.stringify(cart)
            );


            /* =============================================
               UPDATE BADGE
            ============================================= */

            updateGlowinCartBadge();


            /* =============================================
               BUTTON FEEDBACK
            ============================================= */

            const originalHTML =
                this.innerHTML;


            this.innerHTML = `
                <i class="bi bi-check2"></i>
                <span>Added to Bag</span>
            `;


            this.disabled = true;


            setTimeout(
                function () {

                    addToBagButton.innerHTML =
                        originalHTML;

                    addToBagButton.disabled =
                        false;

                },
                1400
            );

        }
    );


    /* =====================================================
       GET PRODUCT PRICE
       ===================================================== */

    function getProductPrice() {

        const priceElement =
            document.querySelector(
                ".glowindetails__current-price"
            );


        if (!priceElement) {
            return 0;
        }


        const priceText =
            priceElement.textContent
                .replace(/[₹,\s]/g, "");


        return Number(priceText) || 0;

    }


    /* =====================================================
       UPDATE CART BADGE
       ===================================================== */

    function updateGlowinCartBadge() {

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


        const count =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(item.quantity);

                },
                0
            );


        const badge =
            document.getElementById(
                "glowinhomepageCartCount"
            );


        if (badge) {

            badge.textContent =
                count;

        }

    }


    /* =====================================================
       INITIAL BADGE
       ===================================================== */

    updateGlowinCartBadge();

});