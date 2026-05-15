// DOM

const servicesContainer =
    document.getElementById("services-container");

// RENDER SERVICES

function renderServices() {

    services.forEach((category) => {

        const accordionSection =
            document.createElement("div");

        accordionSection.classList.add(
            "accordion-section"
        );

        accordionSection.innerHTML = `

      <button class="accordion-btn">
        ${category.category}
      </button>

      <div class="accordion-content">

        ${category.sections.map((section) => `

          <div class="subcategory">

            <button class="subcategory-btn">
              ${section.title}
            </button>

            <div class="subcategory-content">

              <div class="services-grid">

                ${section.items.map((item) => `

                  <article
                    class="reservation-card"
                    data-name="${item.name}"
                    data-price="${item.price}"
                  >

                    <h3>${item.name}</h3>

                    <p>
                      ${item.description}
                    </p>

                    <div class="service-price">
                      ${item.price}€
                    </div>

                    <div class="service-actions">

                      <input
                        type="number"
                        min="1"
                        value="1"
                        class="quantity-input"
                      >

                      <button
                        class="btn-cta add-to-cart-btn"
                      >
                        Ajouter
                      </button>

                    </div>

                  </article>

                `).join("")}

              </div>

            </div>

          </div>

        `).join("")}

      </div>

    `;

        servicesContainer.appendChild(
            accordionSection
        );

    });

}

// INIT

renderServices();

// ACCORDION

document.addEventListener("click", (event) => {

    //   MAIN ACCORDION

    if (
        event.target.classList.contains(
            "accordion-btn"
        )
    ) {

        const content =
            event.target.nextElementSibling;

        content.style.display =
            content.style.display === "block"
                ? "none"
                : "block";
    }

    //   SUBCATEGORY ACCORDION

    if (
        event.target.classList.contains(
            "subcategory-btn"
        )
    ) {

        const content =
            event.target.nextElementSibling;

        content.style.display =
            content.style.display === "block"
                ? "none"
                : "block";
    }

});

