// =========================
// LUXECART CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        contactMessage.innerHTML = `
            <div class="success-message">
                Thanks ${name}! Your message has been sent successfully.
            </div>
        `;

        contactForm.reset();

    });

}