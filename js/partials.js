export async function loadPartials() {
  const includeElements = document.querySelectorAll("[data-include]");

  const includePromises = Array.from(includeElements).map(async element => {
    const file = element.getAttribute("data-include");

    if (!file) {
      return;
    }

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }

      const html = await response.text();
      element.outerHTML = html;
    } catch (error) {
      console.error(error);
      element.innerHTML = `
        <div style="padding: 20px; color: #9effff;">
          Missing partial: ${file}
        </div>
      `;
    }
  });

  await Promise.all(includePromises);
}
