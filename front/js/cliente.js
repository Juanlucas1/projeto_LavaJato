// Global variables:

const submittingModes = {
  Create: "create",
  Edit: "edit",
};

let currentMode = submittingModes.Create;
let createdSchedulingId;
let currentEditingSchedulingId;
let currentUser;
let currentCarWashId;
let currentCarWashName;

// =============================== READ schedulings: ===============================
renderSchedulingsTable();

function renderSchedulingsTable() {
  fetch("http://localhost:8080/agenda")
    .then((response) => response.json())
    .then((schedulingsData) => {
      schedulingsData.forEach((scheduling) => {
        renderScheduling(scheduling);
      });
      return schedulingsData;
    })
    .catch((error) => console.log(error));
}

function renderScheduling(scheduling) {
  let tBody = document.querySelector("tbody.table-group-divider");
  let tR = document.createElement("tr");
  let tDCarWashName = document.createElement("td");
  let tDService = document.createElement("td");
  let tDDate = document.createElement("td");
  let tDTime = document.createElement("td");
  let tDEdit = document.createElement("td");
  let tDRemove = document.createElement("td");
  let editBtn = document.createElement("button");
  let removeBtn = document.createElement("button");
  let editBtnImg = document.createElement("img");
  let removeBtnImg = document.createElement("img");

  tDCarWashName.classList.add("title-td");
  tDService.classList.add("service-td");
  tDDate.classList.add("date-td");
  tDTime.classList.add("time-td");
  tR.setAttribute("data-scheduling-id", scheduling.id_servico);

  tDCarWashName.innerText = scheduling.nome;
  tDService.innerText = scheduling.servicos;
  tDDate.innerText = scheduling.data;
  tDTime.innerText = scheduling.hora;

  editBtn.classList.add("edit-scheduling-btn");
  editBtn.setAttribute("data-bs-toggle", "modal");
  editBtn.setAttribute("data-bs-target", "#scheduling-modal");
  editBtnImg.setAttribute("src", "../assets/edit-btn.svg");
  editBtnImg.setAttribute("alt", "Botão de edição");

  removeBtn.classList.add("remove-scheduling-btn");
  removeBtnImg.setAttribute("src", "../assets/remove-btn.svg");
  removeBtnImg.setAttribute("alt", "Botão de remoção");

  removeBtn.appendChild(removeBtnImg);
  editBtn.appendChild(editBtnImg);

  tDEdit.appendChild(editBtn);
  tDRemove.appendChild(removeBtn);

  tR.appendChild(tDCarWashName);
  tR.appendChild(tDService);
  tR.appendChild(tDDate);
  tR.appendChild(tDTime);
  tR.appendChild(tDEdit);
  tR.appendChild(tDRemove);

  tBody.appendChild(tR);
}

// =============================== CREATE schedulings: ===============================

// Rendering buttons and modals for 'creating' schedulings:
const carWashBtns = document.querySelectorAll(".car-wash");

carWashBtns.forEach((btn) => {
  fetch("http://localhost:8080/lava_jato").then((response) =>
    response
      .json()
      .then((carWashesData) => {
        renderCarWashBtn(carWashesData, btn, currentCarWashId);
        return carWashesData;
      })
      .catch((error) => console.log(error))
  );

  btn.addEventListener("click", (event) => {
    currentCarWashId = event.target.getAttribute("data-car-wash-id");
    fetch("http://localhost:8080/lava_jato").then((response) =>
      response
        .json()
        .then((carWashesData) => {
          renderNewSchedulingModal(carWashesData, currentCarWashId);
          return carWashesData;
        })
        .catch((error) => console.log(error))
    );
  });
});

function renderNewSchedulingModal(carWashes, id) {
  currentMode = submittingModes.Create;

  let carWashNameModal = document.querySelector("#car-wash-info h3");
  let carWashAddressModal = document.querySelector("#car-wash-address");
  let carWashTimeModal = document.querySelector("#car-wash-time");

  let obj = carWashes.find((item) => item.id_lava_jato == id);

  carWashNameModal.innerText = obj.nome;
  let carWashAddress = `${obj.localizacao} ${obj.ceep}`;
  carWashAddressModal.innerText = carWashAddress;
  // carWashTimeModal.innerText = obj.time;
}

function renderCarWashBtn(carWashes, btn, id) {
  let obj = carWashes.find((item) => item.id_lava_jato == id);

  btn.innerText = obj.nome;
}

// CREATE or UPDATE submit form:
const createSchedulingForm = document.querySelector("#scheduling-form");

createSchedulingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let scheduling = {
    id_servico: null,
    servicos: document.querySelector("#service-type").value,
    hora: document.querySelector("#scheduling-time").value,
    data: document.querySelector("#scheduling-date").value,
    nome: document.querySelector("#car-wash-info h3").innerText,
  };

  // Sending the newly created scheduling to the back-end:
  if (currentMode == "create") {
    fetch("http://localhost:8080/agenda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduling),
    })
      .then((responseData) => responseData.json())
      .then((responseJSON) => {
        createdSchedulingId = responseJSON;
      });

    scheduling.id_servico = createdSchedulingId;
    renderScheduling(scheduling); // Rendering the new scheduling created
    alert("Agendamento realizado!");
    event.target.reset(); // Resetting the form
  } else if (currentMode == "edit") {
    scheduling.id_servico = currentEditingSchedulingId;
    let putUrl = `http://localhost:8080/agenda/${currentEditingSchedulingId}`;
    fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduling),
    });
    renderUpdatedScheduling(scheduling, currentEditingSchedulingId);
    alert("Agendamento atualizado!");
    event.target.reset(); // Resetting the form
  } else {
    alert("Modo inválido!");
  }
});

// =============================== UPDATE schedulings: ===============================

// Renderization for 'updating' schedulings:
const tBody = document.querySelector("tbody.table-group-divider");

// Capturing the 'click' event over the edit button for each scheduling row:
tBody.addEventListener("click", (event) => {
  const editBtns = document.querySelectorAll(".edit-scheduling-btn");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      const row = editBtn.parentNode.parentNode;
      currentMode = submittingModes.Edit;
      currentEditingSchedulingId = row.getAttribute("data-scheduling-id");

      fetch("http://localhost:8080/agenda")
        .then((response) => response.json())
        .then((schedulingsData) => {
          renderEditSchedulingModal(
            schedulingsData,
            currentEditingSchedulingId
          );
          return schedulingsData;
        })
        .catch((error) => console.log(error));
    });
  });
});

function renderEditSchedulingModal(schedulings, id) {
  const schedulingObj = schedulings.find((item) => item.id_servico == id);

  const dateInput = document.querySelector("#scheduling-date");
  const timeInput = document.querySelector("#scheduling-time");

  fetch("http://localhost:8080/lava_jato").then((response) =>
    response
      .json()
      .then((carWashesData) => {
        const carWashObj = carWashesData.find(
          (item) => item.nome == schedulingObj.nome
        );
        let carWashNameModal = document.querySelector("#car-wash-info h3");
        let carWashAddressModal = document.querySelector("#car-wash-address");
        let carWashTimeModal = document.querySelector("#car-wash-time");

        carWashNameModal.innerText = carWashObj.nome;
        carWashAddressModal.innerText = carWashObj.localizacao;
        // carWashTimeModal.innerText = carWashObj.time;

        return carWashesData;
      })
      .catch((error) => console.log(error))
  );

  dateInput.value = schedulingObj.data;
  timeInput.value = schedulingObj.hora;
}

function renderUpdatedScheduling(scheduling, id) {
  let dateSelector = `tr[data-scheduling-id="${id}"] td.date-td`;
  let tDDate = document.querySelector(dateSelector);

  let timeSelector = `tr[data-scheduling-id="${id}"] td.time-td`;
  let tDTime = document.querySelector(timeSelector);

  tDDate.innerText = scheduling.data;
  tDTime.innerText = scheduling.hora;
}

// =============================== DELETE schedulings: ===============================

// Capturing the 'click' event over the remove button for each scheduling row:
tBody.addEventListener("click", (event) => {
  const removeBtns = document.querySelectorAll(".remove-scheduling-btn");

  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      let deleteUserDecision = confirm("Você deseja deletar a tarefa?");

      if (deleteUserDecision) {
        let row = removeBtn.parentNode.parentNode;
        let deleteSchedulingId = row.getAttribute("data-scheduling-id");
        let deleteUrl = `http://localhost:8080/agenda/${deleteSchedulingId}`;
        console.log(deleteUrl);
        fetch(deleteUrl, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              alert("Agendamento cancelado com sucesso!");
              unrenderScheduling(row);
            } else {
              alert("Erro ao cancelar:", response.status);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  });
});

function unrenderScheduling(row) {
  let parentElement = document.querySelector("tbody.table-group-divider");
  parentElement.removeChild(row);
}
