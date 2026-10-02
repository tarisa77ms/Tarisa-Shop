const products = [
    {
        id: 1,
        name: "Kemeja Casual Premium",
        category: "Fashion",
        price: 129000,
        rating: 4.9,
        badge: "Terlaris",
        bg: "fashion-bg",
        image: "https://i.pinimg.com/736x/0d/45/27/0d45278b0126599a8d89c81a15e54020.jpg",
        source: "https://id.pinterest.com/pin/648799890113827666/"
    },

    {
        id: 2,
        name: "Hoodie Basic Unisex",
        category: "Fashion",
        price: 159000,
        rating: 4.8,
        badge: "Baru",
        bg: "fashion-bg",
        image: "https://i.pinimg.com/1200x/e4/c8/53/e4c8530c9e9af1c2b6d6d0e4a28f436e.jpg"
    },

    {
        id: 3,
        name: "Celana Casual",
        category: "Fashion",
        price: 139000,
        rating: 4.8,

        badge: "Baru",
        bg: "fashion-bg",
        image: "https://i.pinimg.com/736x/43/bd/27/43bd27172836f1b51c799da5792aa08b.jpg"
    },

    {
        id: 4,
        name: "Sneakers Urban White",
        category: "Sepatu",
        price: 249000,
        rating: 4.9,
        badge: "Promo",
        bg: "shoes-bg",
        image: "https://i.pinimg.com/736x/fc/40/a5/fc40a556515306c12dda4f3f90ce5ca5.jpg"
    },

    {
        id: 5,
        name: "Sandal Casual Comfort",
        category: "Sepatu",
        price: 99000,
        rating: 4.7,
        badge: "Hemat",
        bg: "shoes-bg",
        image: "https://i.pinimg.com/736x/2d/0b/89/2d0b894e029c3ad448c4e4b52fcd286c.jpg"
    },

    {
        id: 6,
        name: "Tote Bag Daily",
        category: "Tas",
        price: 119000,
        rating: 4.8,
        badge: "Favorit",
        bg: "bag-bg",
        image: "https://i.pinimg.com/736x/22/f0/ed/22f0edffd9400fb97b8199045add1745.jpg"
    },

    {
        id: 7,
        name: "Tas Pria Casual",
        category: "Tas",
        price: 179000,
        rating: 4.9,
        badge: "Baru",
        bg: "bag-bg",
        image: "https://down-id.img.susercontent.com/file/id-11134207-8224r-mhmtj8socah2a9@resize_w900_nl.webp"
    },

    {
        id: 8,
        name: "Jam Tangan Classic",
        category: "Aksesoris",
        price: 199000,
        rating: 4.8,
        badge: "Terlaris",
        bg: "accessory-bg",
        image: "https://i.pinimg.com/736x/84/b4/31/84b4310189ddfd815304b16b3318f0da.jpg"
    },

   {
    id: 9,
    name: "Kacamata Fashion",
    category: "Aksesoris",
    price: 79000,
    rating: 4.7,
    badge: "Promo",
    bg: "accessory-bg",
    image: "https://i.pinimg.com/736x/0e/42/af/0e42afbc29a9106581e9126859b3cbe2.jpg"
},

{
    id: 10,
    name: "Gelang Fashion",
    category: "Aksesoris",
    price: 69000,
    rating: 4.8,
    badge: "Baru",
    bg: "accessory-bg",
    image: "https://i.pinimg.com/736x/5d/93/fc/5d93fcdba214ffe2040f3cee95e325fc.jpg"
},

{
    id: 11,
    name: "Cincin Fashion",
    category: "Aksesoris",
    price: 59000,
    rating: 4.8,
    badge: "Favorit",
    bg: "accessory-bg",
    image: "https://i.pinimg.com/1200x/d0/23/f9/d023f9fd8f76e108be464432191e81a0.jpg"
}
];

let cart = JSON.parse(localStorage.getItem("tarisaCart") || "[]");
let registeredUser = JSON.parse(localStorage.getItem("tarisaUser") || "null");
let loggedInUser = JSON.parse(localStorage.getItem("tarisaLoggedIn") || "null");
let currentCategory = "Semua";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderProducts() {
    const grid = $("#productGrid");
    const keyword = ($("#searchInput").value || "").toLowerCase().trim();

    const filtered = products.filter(product => {
        const categoryMatch =
            currentCategory === "Semua" || product.category === currentCategory;

        const keywordMatch =
            !keyword ||
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        return categoryMatch && keywordMatch;
    });

    $("#productResult").textContent =
        `${filtered.length} produk ditemukan`;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-cart" style="grid-column:1/-1">
                <h3>Produk tidak ditemukan</h3>
                <p>Coba gunakan kata kunci lain.</p>
            </div>`;
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <article class="product-card">
            <div class="product-image ${product.bg}">
    <span class="product-badge ${product.badge === "Promo" ? "sale" : ""}">
        ${product.badge}
    </span>

    <button class="favorite"
        data-favorite="${product.id}"
        title="Favorit">♡</button>

    ${product.image
        ? `<img src="${product.image}" alt="${product.name}" class="product-img">`
        : `<div class="product-emoji">${product.emoji}</div>`
    }
</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>
                <div class="rating">★★★★★ <span>${product.rating}</span></div>
                <div class="product-bottom">
                    <strong>${formatRupiah(product.price)}</strong>
                    <button class="add-cart" data-add="${product.id}" title="Tambah ke keranjang">+</button>
                </div>
            </div>
        </article>
    `).join("");

    $$("[data-add]").forEach(button => {
        button.addEventListener("click", () => addToCart(Number(button.dataset.add)));
    });

    $$("[data-favorite]").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            button.textContent = button.classList.contains("active") ? "♥" : "♡";
        });
    });
}

function setCategory(category) {
    currentCategory = category;

    $$(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === category);
    });

    renderProducts();

    document.querySelector("#produk").scrollIntoView({
        behavior: "smooth"
    });
}

$$(".filter-btn").forEach(button => {
    button.addEventListener("click", () => setCategory(button.dataset.category));
});

$$(".category-card").forEach(button => {
    button.addEventListener("click", () => setCategory(button.dataset.category));
});

$$(".dropdown-content a").forEach(link => {
    link.addEventListener("click", () => {
        setCategory(link.dataset.category);
    });
});

$("#searchToggle").addEventListener("click", () => {
    $("#searchPanel").classList.toggle("show");
    if ($("#searchPanel").classList.contains("show")) {
        $("#searchInput").focus();
    }
});

$("#searchButton").addEventListener("click", () => {
    renderProducts();
    $("#produk").scrollIntoView({ behavior: "smooth" });
});

$("#searchInput").addEventListener("input", renderProducts);

$("#searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        renderProducts();
        $("#produk").scrollIntoView({ behavior: "smooth" });
    }
});

function saveCart() {
    localStorage.setItem("tarisaCart", JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.qty, 0);
    $("#cartCount").textContent = count;
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            qty: 1
        });
    }

    saveCart();
    updateCartCount();
    renderCart();
    showToast(`${product.name} ditambahkan ke keranjang`);
}

function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.qty += amount;

    if (item.qty <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== productId);
    }

    saveCart();
    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function renderCart() {
    const container = $("#cartItems");

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div style="font-size:55px">🛒</div>
                <h3>Keranjang masih kosong</h3>
                <p>Yuk pilih produk favoritmu.</p>
            </div>`;
        $("#cartTotal").textContent = formatRupiah(0);
        return;
    }

    let total = 0;

    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const subtotal = product.price * item.qty;
        total += subtotal;

        return `
            <div class="cart-item">
                <div class="cart-thumb">${product.emoji}</div>
                <div>
                    <h4>${product.name}</h4>
                    <p>${formatRupiah(product.price)}</p>
                    <div class="qty-controls">
                        <button data-minus="${product.id}">−</button>
                        <span>${item.qty}</span>
                        <button data-plus="${product.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-remove="${product.id}">Hapus</button>
            </div>`;
    }).join("");

    $("#cartTotal").textContent = formatRupiah(total);

    $$("[data-minus]").forEach(btn => {
        btn.addEventListener("click", () => changeQuantity(Number(btn.dataset.minus), -1));
    });

    $$("[data-plus]").forEach(btn => {
        btn.addEventListener("click", () => changeQuantity(Number(btn.dataset.plus), 1));
    });

    $$("[data-remove]").forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.remove)));
    });
}

function openCart() {
    $("#cartDrawer").classList.add("show");
    $("#drawerOverlay").classList.add("show");
}

function closeCart() {
    $("#cartDrawer").classList.remove("show");
    $("#drawerOverlay").classList.remove("show");
}

$("#cartButton").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#drawerOverlay").addEventListener("click", closeCart);
$("#footerCart").addEventListener("click", (event) => {
    event.preventDefault();
    openCart();
});

function openModal(id) {
    $(`#${id}`).classList.add("show");
}

function closeModal(id) {
    $(`#${id}`).classList.remove("show");
}

$$("[data-close]").forEach(button => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
});

$$(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

$("#loginButton").addEventListener("click", () => openModal("loginModal"));
$("#registerButton").addEventListener("click", () => openModal("registerModal"));

$("#switchToRegister").addEventListener("click", () => {
    closeModal("loginModal");
    openModal("registerModal");
});

$("#switchToLogin").addEventListener("click", () => {
    closeModal("registerModal");
    openModal("loginModal");
});

$("#footerLogin").addEventListener("click", (event) => {
    event.preventDefault();
    if (loggedInUser) {
        logout();
    } else {
        openModal("loginModal");
    }
});

function validasiRegister() {
    const nama = $("#registerName").value.trim();
    const email = $("#registerEmail").value.trim();
    const password = $("#registerPassword").value;
    const alamat = $("#registerAddress").value.trim();

    if (nama !== "" && email !== "" && password !== "" && alamat !== "") {
        return true;
    }

    alert("Anda harus mengisi data dengan lengkap!");
    return false;
}

$("#registerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validasiRegister()) return;

    const nama = $("#registerName").value.trim();
    const email = $("#registerEmail").value.trim();
    const password = $("#registerPassword").value;
    const alamat = $("#registerAddress").value.trim();

    if (password.length < 6) {
        alert("Password minimal 6 karakter!");
        return;
    }

    registeredUser = { nama, email, password, alamat };
    localStorage.setItem("tarisaUser", JSON.stringify(registeredUser));

    $("#registerForm").reset();
    closeModal("registerModal");
    openModal("loginModal");

    $("#loginEmail").value = email;
    showToast("Pendaftaran berhasil. Silakan login.");
});

function validasiLogin() {
    const email = $("#loginEmail").value.trim();
    const password = $("#loginPassword").value;

    if (email !== "" && password !== "") {
        return true;
    }

    alert("Email dan password harus diisi!");
    return false;
}

$("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validasiLogin()) return;

    const email = $("#loginEmail").value.trim();
    const password = $("#loginPassword").value;

    if (!registeredUser) {
        alert("Akun belum terdaftar. Silakan klik Daftar terlebih dahulu.");
        return;
    }

    if (email !== registeredUser.email || password !== registeredUser.password) {
        alert("Email atau password salah!");
        return;
    }

    loggedInUser = {
        nama: registeredUser.nama,
        email: registeredUser.email
    };

    localStorage.setItem("tarisaLoggedIn", JSON.stringify(loggedInUser));
    $("#loginForm").reset();
    closeModal("loginModal");
    updateAuthArea();
    showToast(`Selamat datang, ${loggedInUser.nama}!`);
});

function logout() {
    loggedInUser = null;
    localStorage.removeItem("tarisaLoggedIn");
    updateAuthArea();
    showToast("Anda berhasil logout.");
}

function updateAuthArea() {
    const area = $("#authArea");

    if (loggedInUser) {
        area.innerHTML = `
            <div class="user-menu">
                <span class="user-name">👤 ${loggedInUser.nama}</span>
                <button class="logout-btn" id="logoutButton">Logout</button>
            </div>
        `;

        $("#logoutButton").addEventListener("click", logout);
    } else {
        area.innerHTML = `
            <button class="outline-btn" id="loginButton">Masuk</button>
            <button class="primary-small" id="registerButton">Daftar</button>
        `;

        $("#loginButton").addEventListener("click", () => openModal("loginModal"));
        $("#registerButton").addEventListener("click", () => openModal("registerModal"));
    }
}

$("#checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    if (!loggedInUser) {
        closeCart();
        openModal("loginModal");
        showToast("Silakan login sebelum checkout.");
        return;
    }

    alert(
        "Checkout berhasil disimulasikan!\n\n" +
        "Terima kasih, " + loggedInUser.nama + ".\n" +
        "Pesanan Anda sedang diproses."
    );

    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    closeCart();
});

$("#shopNow").addEventListener("click", () => {
    $("#produk").scrollIntoView({ behavior: "smooth" });
});

$("#promoNow").addEventListener("click", () => {
    $("#promo").scrollIntoView({ behavior: "smooth" });
});

$("#promoProductButton").addEventListener("click", () => {
    setCategory("Semua");
});

renderProducts();
renderCart();
updateCartCount();
updateAuthArea();