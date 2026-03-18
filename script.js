const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  const formData = { name, email, message };

  const btn = form.querySelector("button");

  try {
    btn.innerText = "Sending...";
    btn.disabled = true;

    // Formspree
    await fetch("https://formspree.io/f/xjgayvek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    // Backend
    await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    // ✅ Teacher message
    alert(`Thank you for submitting the form, ${name}. You will be contacted soon.`);

    form.reset();

  } catch (err) {
    alert("Failed to send message");
  } finally {
    btn.innerText = "Send Message";
    btn.disabled = false;
  }
});