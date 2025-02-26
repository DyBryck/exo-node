const main = document.querySelector("main");

fetch("http://localhost:4000/articles")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const div = document.createElement("div");

      const title = document.createElement("h2");
      title.textContent = element.title;

      const body = document.createElement("p");
      body.textContent = element.content;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.addEventListener("click", () => deleteArticle(element.id));

      const editButton = document.createElement("button");
      editButton.textContent = "Éditer";
      editButton.addEventListener("click", () => showModal(element));

      div.append(title, body, editButton, deleteButton);
      main.appendChild(div);
    });
  });

const modal = document.querySelector("#modal");

const hideModal = () => {
  modal.style.display = "none";
  const modalSubmitBtn = document.querySelector("#modal-submit-btn");
  if (modalSubmitBtn) modalSubmitBtn.remove();
};

const modalCloseBtn = document.querySelector("#modal-close-btn");
modalCloseBtn.addEventListener("click", hideModal);

const showModal = (article) => {
  modal.style.display = "flex";
  const modalContent = document.querySelector("#modal-content");

  const modalTitle = document.querySelector("#modal-title");
  modalTitle.value = article.title;

  const modalBody = document.querySelector("#modal-body");
  modalBody.textContent = article.content;

  const modalSubmitBtn = document.createElement("button");
  modalSubmitBtn.textContent = "Modifier";
  modalSubmitBtn.id = "modal-submit-btn";
  modalSubmitBtn.addEventListener("click", () =>
    editArticle(event, article.id),
  );

  modalContent.appendChild(modalSubmitBtn);
};

const editArticle = (event, id) => {
  event.preventDefault();
  const editArticleForm = document.querySelector("#edit-article-form");
  const formData = new FormData(editArticleForm);

  const body = {};
  formData.forEach((value, key) => (body[key] = value));

  fetch(`http://localhost:4000/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  hideModal();
};

const deleteArticle = async (id) => {
  fetch(`http://localhost:4000/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const sendArticleForm = document.querySelector("#send-article-form");
const addArticle = (event) => {
  event.preventDefault();
  const formData = new FormData(sendArticleForm);

  const body = {};
  formData.forEach((value, key) => (body[key] = value));

  fetch("http://localhost:4000/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

sendArticleForm.addEventListener("submit", addArticle);
