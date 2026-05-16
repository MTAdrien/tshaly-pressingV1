const container = document.getElementById("tarifs-container");

function renderTarifs() {

    services.forEach(category => {

        const section = document.createElement("div");

        section.classList.add("tarif-section");

        section.innerHTML = `

            <h2>${category.category}</h2>

            ${category.sections.map(section => `

                <div class="tarif-subsection">

                    <h3>${section.title}</h3>

                    <div class="tarif-grid">

                        ${section.items.map(item => `

                            <div class="tarif-card">

                                <div>
                                    <h4>${item.name}</h4>
                                    <p>${item.description}</p>
                                </div>

                                <div class="tarif-price">
                                    ${typeof item.price === "number"
                                        ? `${item.price}€`
                                        : item.price
                            }
                                </div>

                            </div>

                        `).join("")}

                    </div>

                </div>

            `).join("")}

        `;

        container.appendChild(section);

    });

}

renderTarifs();