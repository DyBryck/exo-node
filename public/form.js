const select = document.querySelector("select");

fetch("http://localhost:4000/data")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.id;

      select.appendChild(option);
    });
  });

const createData = document.querySelector("#create-data");

createData.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(createData);

  const body = {};
  formData.forEach((value, key) => (body[key] = value));

  const response = await fetch("http://localhost:4000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
});

const deleteData = document.querySelector("#delete-data");

deleteData.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(deleteData);

  const body = {};
  formData.forEach((value, key) => (body[key] = value));

  const response = await fetch(
    `http://localhost:4000/data/${body.idToDelete}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  console.log(data);
});
