document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
});

function validateForm() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => (error.innerText = ""));

  const fields = [
    {
      id: "firstName",
      errorId: "firstNameError",
      message: "Bir değer giriniz.",
    },
    { id: "lastName", errorId: "lastNameError", message: "Bir değer giriniz." },
    {
      id: "number",
      errorId: "numberError",
      message: "Lütfen cep telefonunuzu giriniz.",
    },
    {
      id: "email",
      errorId: "emailError",
      message: "E-postanızı kontrol ediniz.",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    {
      id: "password",
      errorId: "passwordError",
      message: "Bir değer giriniz.",
      minLength: 6,
    },
    {
      id: "dropdown4",
      errorId: "genderError",
      message: "Lütfen seçiniz",
      isSelect: true,
    },
    {
      id: "option3",
      errorId: "option3Error",
      message: "Lütfen seçiniz",
    },
    {
      id: "option4",
      errorId: "option4Error",
      message: "Lütfen seçiniz",
    },
  ];
  let valid = true;

  fields.forEach((field) => {
    if (document.getElementById(field.id).type == "checkbox") {
      if (document.getElementById(field.id).checked == false) {
        document.getElementById(field.errorId).innerText = field.message;
        valid = false;
      }
    } else {
      const value = document.getElementById(field.id).value.trim();
      if (value === "") {
        document.getElementById(field.errorId).innerText = field.message;
        valid = false;
      }
    }
  });

  return valid;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function (event) {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const number = document.getElementById("number").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const selectedDay = document.getElementById("dropdown1").value;
    const selectedMonth = document.getElementById("dropdown2").value;
    const selectedYear = document.getElementById("dropdown3").value;
    const selectedGender = document.getElementById("dropdown4").value;
    const isValid = validateForm();

    if (isValid) {
      console.log("Ad:", firstName);
      console.log("Soyad:", lastName);
      console.log("Telefon:", number);
      console.log("E-posta:", email);
      console.log("Şifre:", password);
      console.log("Gün:", selectedDay);
      console.log("Ay:", selectedMonth);
      console.log("Yıl:", selectedYear);
      console.log("Cinsiyet:", selectedGender);

      const formData = {
        firstName: firstName,
        lastName: lastName,
        number: number,
        email: email,
        password: password,
        birthDay: {
          day: selectedDay,
          month: selectedMonth,
          year: selectedYear,
        },
        gender: selectedGender,
      };

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Başarılı gönderim:", data);
        })
        .catch((error) => {
          console.error("Hata oluştu:", error);
        });
    }
  });
});
