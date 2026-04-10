document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", async () => {
      const handle = card.dataset.handle;

      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();

      showPopup(product);
    });
  });

  document.querySelector(".close").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
  };

  document.getElementById("add-to-cart").onclick = async () => {
    const variantId = document.getElementById("variant-select").value;

    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    });

    alert("Added to cart");
  };

});

function showPopup(product) {
  document.getElementById("popup-title").innerText = product.title;
  document.getElementById("popup-price").innerText = (product.price / 100).toFixed(2);
  document.getElementById("popup-desc").innerHTML = product.description;
  document.getElementById("popup-img").src = product.images[0];

  const select = document.getElementById("variant-select");
  select.innerHTML = "";

  product.variants.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.id;
    opt.textContent = v.title;
    select.appendChild(opt);
  });

  document.getElementById("popup").classList.remove("hidden");
}