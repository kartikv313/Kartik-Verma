document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", async () => {
      const handle = card.dataset.handle;
      if (!handle) return;

      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();

      openPopup(product);
    });
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
  });

});

function openPopup(product) {
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