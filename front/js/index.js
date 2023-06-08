// Sign-up events and functions:
const createUserForm = document.querySelector("#sign-up-form");

createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let vehicleTypeRadioInputs = Array.from(
    document.querySelector('input[type="radio"][name="vehicle-type"]')
  );
  let vehicleTypeSelectedValue;

  vehicleTypeRadioInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      vehicleTypeSelectedValue = event.target.value;
    });
  });
  let user = {
    nome: document.querySelector("#new-name").value,
    vehicleType: vehicleTypeSelectedValue,
    username: document.querySelector("#new-username").value,
    senha: document.querySelector("#new-password").value,
  };

  fetch("http://localhost:8080/cliente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        alert("Cadastro feito com sucesso!");
      } else {
        alert("Cadastro falhou, tente novamente!");
      }
    })
    .catch((error) => console.log(error));
});
