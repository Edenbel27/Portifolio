// Update these with your real links
const githubUrl = "";
const linkedinUrl = "";

// EmailJS configuration (provided by you)
const emailJsPublicKey = "manDrTKEYziH0TnMd";
const emailJsServiceId = "service_gjfbh51";
const emailJsTemplateId = "template_n7j6sl9";

const heroGithub = document.getElementById("hero-github");
const heroLinkedin = document.getElementById("hero-linkedin");
const contactGithub = document.getElementById("contact-github");
const contactLinkedin = document.getElementById("contact-linkedin");
const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");
const contactStatus = document.getElementById("contact-status");
const contactSubmitBtn = document.querySelector(".contact-form-btn");

// Initialize EmailJS if available
if (window.emailjs && emailJsPublicKey) {
  window.emailjs.init(emailJsPublicKey);
}

if (githubUrl) {
  heroGithub?.setAttribute("href", githubUrl);
  contactGithub?.setAttribute("href", githubUrl);
}

if (linkedinUrl) {
  heroLinkedin?.setAttribute("href", linkedinUrl);
  contactLinkedin?.setAttribute("href", linkedinUrl);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = contactName?.value?.trim() || "Someone";
    const email = contactEmail?.value?.trim() || "";
    const message = contactMessage?.value?.trim() || "";

    if (!window.emailjs) {
      contactStatus.textContent = "Email service not loaded. Please refresh and try again.";
      contactStatus.style.color = "#ff6b6b";
      return;
    }

    contactStatus.textContent = "Sending...";
    contactStatus.style.color = "#a5adc6";
    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.style.opacity = "0.7";
    }

    try {
      await window.emailjs.send(emailJsServiceId, emailJsTemplateId, {
        name,
        email,
        message,
        reply_to: email,
        from_email: email,
        subject: `Portfolio contact from ${name}`,
      });
      contactStatus.textContent = "Message sent! I'll get back to you soon.";
      contactStatus.style.color = "#4caf50";
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent = "Unable to send right now. Please try again later.";
      contactStatus.style.color = "#ff6b6b";
    } finally {
      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.style.opacity = "1";
      }
    }
  });
}
