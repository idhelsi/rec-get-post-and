let ul = document.querySelector("ul");
let user = document.querySelector(".user");
let name = document.querySelector(".name");
let processedIds = new Set();
async function adicinar() {
  try {
    let users = document.querySelector(".user");
    users.innerHTML = "Carregando...";

    let response = await fetch(
      "https://661b225665444945d04f1146.mockapi.io/api/users"
    );
    let json = await response.json();

    if (json.length > 0) {
      users.innerHTML = "";

      for (let i in json) {
        if (!processedIds.has(json[i].id)) {
          processedIds.add(json[i].id);
          let h1 = document.createElement("li");
          let hh = document.createElement("li");
          h1.textContent = `User: ${json[i].user}`;
          hh.textContent = `Nome: ${json[i].name}`;
        //   ul.innerHTML = '<hr/>'
          ul.append(h1);
          ul.append(hh);

        }
      }
    } else {
      users.innerHTML = "Nenhum usuário";
    }
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

async function inseri(userValue, nameValue) {
  try {
    await fetch("https://661b225665444945d04f1146.mockapi.io/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: userValue,
        name: nameValue,
      }),
    });

    user.value = "";
    name.value = "";

    adicinar();
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    alert("Erro ao inserir usuário. Por favor, tente novamente.");
  }
}

let addBut = document.createElement("button");
addBut.innerText = "Adicionar";
addBut.classList.add("add-button");
let form = ul.parentNode;
form.insertBefore(addBut, ul);

addBut.addEventListener("click", () => {
  let userValue = user.value.trim();
  let nameValue = name.value.trim();

  if (userValue && nameValue) {
    inseri(userValue, nameValue);
  } else {
    alert("Preencha todos os campos.");
  }
});

adicinar();
