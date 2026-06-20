async function loadSamplePlanets() {
  const holders = document.querySelectorAll("[data-planets]");
  if (!holders.length) return;

  try {
    const res = await fetch("data/sample-planets.json", { cache: "no-store" });
    const planets = await res.json();

    holders.forEach(holder => {
      const limit = Number(holder.getAttribute("data-limit") || planets.length);
      holder.innerHTML = planets.slice(0, limit).map(p => {
        const imageFile = p.image_file || `planet-${p.token_id}.svg`;
        const imagePath = `assets/images/${imageFile}`;
        return `
          <article class="card feature planet-card-only">
            <img src="${imagePath}" alt="${p.name} archive preview artwork">
          </article>
        `;
      }).join("");
    });
  } catch (error) {
    console.error("Could not load sample planet data:", error);
  }
}

loadSamplePlanets();
