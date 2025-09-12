// Credenciais simples
const adminUser = "admin";
const adminPass = "1234";

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === adminUser && pass === adminPass) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    loadInventory();
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function logout() {
  document.getElementById("main-app").style.display = "none";
  document.getElementById("login-screen").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Alternar seções
function showSection(section) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(`${section}-section`).style.display = 'block';
}

// Adicionar item ao estoque
function addItem() {
  const item = {
    name: document.getElementById("item-name").value,
    category: document.getElementById("item-category").value,
    size: document.getElementById("item-size").value,
    color: document.getElementById("item-color").value,
    price: parseFloat(document.getElementById("item-price").value),
    quantity: parseInt(document.getElementById("item-quantity").value),
    image: document.getElementById("item-image").value || ""
  };

  if (!item.name || isNaN(item.price) || isNaN(item.quantity)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const items = JSON.parse(localStorage.getItem("inventory")) || [];
  items.push(item);
  localStorage.setItem("inventory", JSON.stringify(items));
  alert("Peça cadastrada com sucesso!");

  document.querySelectorAll('#register-section input').forEach(i => i.value = "");
  loadInventory();
}

// Carregar estoque na tabela
function loadInventory() {
  const table = document.getElementById("inventory-table");
  table.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("inventory")) || [];

  items.forEach((item, index) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="Peça" onerror="this.src='https://via.placeholder.com/60'" />
      </td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.size}</td>
      <td>${item.color}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>
        <button onclick="deleteItem(${index})">Excluir</button>
      </td>
    `;
  });
}

function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem("inventory")) || [];
  if (confirm("Tem certeza que deseja excluir esta peça?")) {
    items.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(items));
    loadInventory();
  }
}
