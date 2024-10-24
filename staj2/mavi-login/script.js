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

$(document).ready(function() {

  $("#submitButton").click(function(event) {
    event.preventDefault(); 

    const formData = $("#registerForm").serializeArray(); 
    const jsonData = {};

    
    formData.forEach(function(item) {
      console.log(item.name + ": " + item.value);
    });

    if (validateForm()) {
      console.log("Form Data (JSON):", jsonData);

      $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(jsonData), 
        success: function(data) {
          console.log("Başarılı gönderim:", data);
        },
        error: function(error) {
          console.error("Hata oluştu:", error);
        }
      });
    }
  });
});