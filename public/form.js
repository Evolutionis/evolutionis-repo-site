document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const serviceSelect = document.getElementById("service");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const requiredFields = [nameInput, emailInput, phoneInput, serviceSelect];
  const validators = new Map([
    [nameInput, validateNameValue],
    [emailInput, validateEmailValue],
    [phoneInput, validatePhoneValue],
    [serviceSelect, validateServiceValue],
  ]);

  /* =========================
     FUNÇÕES AUXILIARES
  ========================== */
  function showError(input, message) {
    removeError(input);

    input.classList.add("border-red-500");

    const error = document.createElement("span");
    error.className = "text-red-500 text-sm mt-1 block";
    error.innerText = message;

    input.parentElement.appendChild(error);

    console.error(`Erro no campo ${input.id}: ${message}`);
    console.error(`Valor recebido: "${input.value}"`);
  }

  function removeError(input) {
    input.classList.remove("border-red-500");

    const error = input.parentElement.querySelector("span");
    if (error) error.remove();
  }

 

  function showSuccessToast() {
    const toast = document.getElementById("success-toast");

    toast.classList.remove("translate-x-[120%]", "opacity-0");
    toast.classList.add("translate-x-0", "opacity-100");

    setTimeout(() => {
      toast.classList.add("translate-x-[120%]", "opacity-0");
      toast.classList.remove("translate-x-0", "opacity-100");
    }, 3500);
  }

  /* =========================
   FUNÇÃO VISUAL DE STATUS
========================== */

 function setValid(input) {
  input.classList.remove("border-red-500", "border-gray-300");
  input.classList.add("border-green-500");
}

  function setInvalid(input) {
    input.classList.remove("border-green-500", "border-gray-300");
    input.classList.add("border-red-500");
  }

function setNeutral(input) {
  input.classList.remove("border-green-500", "border-red-500");
  input.classList.add("border-gray-300");
}

  /* =========================
   VALIDAÇÕES INDIVIDUAIS
========================== */

  function validateNameValue(value) {
    return value.trim().split(/\s+/).filter(Boolean).length >= 2;
  }

  function validateEmailValue(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
  }

  function validatePhoneValue(value) {
    const numbers = value.replace(/\D/g, "");
    return numbers.length === 10 || numbers.length === 11;
  }

  function validateServiceValue(value) {
    return value !== "";
  }

  function hasValue(input) {
    if (!input) return false;
    if (input === serviceSelect) return input.value !== "";
    return input.value.trim().length > 0;
  }

  function isFieldValid(input) {
    if (!input) return true;
    const validator = validators.get(input);
    if (!validator) return true;
    return validator(input.value);
  }

  function updateFieldVisual(input, options = {}) {
    const { forceFeedback = false } = options;
    const valid = isFieldValid(input);
    const shouldShowInvalid = forceFeedback || hasValue(input);

    removeError(input);

    if (valid) {
      setValid(input);
    } else if (shouldShowInvalid) {
      setInvalid(input);
    } else {
      setNeutral(input);
    }

    return valid;
  }

  function toggleSubmitButton(disabled) {
    if (!submitButton) return;
    submitButton.disabled = disabled;
    submitButton.classList.toggle("bg-primary-600", !disabled);
    submitButton.classList.toggle("hover:bg-primary-700", !disabled);
    submitButton.classList.toggle("text-white", !disabled);
    submitButton.classList.toggle("bg-gray-300", disabled);
    submitButton.classList.toggle("text-gray-500", disabled);
    submitButton.classList.toggle("cursor-not-allowed", disabled);
  }

  function updateSubmitButtonState() {
    const formValid = requiredFields.every(isFieldValid);
    toggleSubmitButton(!formValid);
  }

  /* =========================
   EVENTOS EM TEMPO REAL
========================== */

  setNeutral(nameInput);
  setNeutral(emailInput);
  setNeutral(phoneInput);
  setNeutral(serviceSelect);
  toggleSubmitButton(true);

  /* =========================
     MÁSCARA TELEFONE
  ========================== */
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, "($1");
    }

    e.target.value = value;
    updateFieldVisual(phoneInput);
    updateSubmitButtonState();
  });

   // =========================
  // Live validation (borders)
  // =========================
  nameInput.addEventListener("input", function () {
    updateFieldVisual(this);
    updateSubmitButtonState();
  });

  emailInput.addEventListener("input", function () {
    updateFieldVisual(this);
    updateSubmitButtonState();
  });

  serviceSelect.addEventListener("change", function () {
    updateFieldVisual(this);
    updateSubmitButtonState();
  });

  /* =========================
     ENVIO COM VALIDAÇÃO
  ========================== */
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceSelect.value;
    const message = document.getElementById("message").value.trim();
    
    let isValid = true;

    // clear previous messages
    removeError(nameInput);
    removeError(emailInput);
    removeError(phoneInput);
    removeError(serviceSelect);

    // Name
    if (!validateNameValue(name)) {
      showError(nameInput, "Digite nome e sobrenome.");
      setInvalid(nameInput);
      isValid = false;
    } else {
      setValid(nameInput);
    }

    // Email
    if (!validateEmailValue(email)) {
      showError(emailInput, "Digite um e-mail válido.");
      setInvalid(emailInput);
      isValid = false;
    } else {
      setValid(emailInput);
    }

    // Phone
    if (!validatePhoneValue(phone)) {
      showError(phoneInput, "Digite um telefone válido (10 ou 11 dígitos).");
      setInvalid(phoneInput);
      isValid = false;
    } else {
      setValid(phoneInput);
    }

    // Service
    if (!validateServiceValue(service)) {
      showError(serviceSelect, "Selecione um serviço.");
      setInvalid(serviceSelect);
      isValid = false;
    } else {
      setValid(serviceSelect);
    }

    updateSubmitButtonState();
    if (!isValid) return;

    /* =========================
       WHATSAPP REDIRECT
    ========================== */

    // Friendly service label (optional)
    const serviceLabel =
      serviceSelect.options[serviceSelect.selectedIndex]?.text || service;

    const whatsappMessage =
      `Olá! Gostaria de solicitar um orçamento.\n\n` +
      `*Nome:* ${name}\n` +
      `*E-mail:* ${email}\n` +
      `*Telefone:* ${phone}\n` +
      `*Serviço:* ${serviceLabel}\n` +
      `*Mensagem:* ${message}`;

    const url = `https://wa.me/5511917513230?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    const newWindow = window.open(url, "_blank");

    if (newWindow) {
      contactForm.reset();
      // reset field styles and disable the button again
      [nameInput, emailInput, phoneInput, serviceSelect].forEach((field) => {
        removeError(field);
        setNeutral(field);
      });
      toggleSubmitButton(true);

      showSuccessToast();
    }
  });
});
