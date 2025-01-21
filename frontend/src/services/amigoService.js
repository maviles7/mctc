const BASE_URL = "/api";

export async function getAmigo() {
  const res = await fetch(`${BASE_URL}/user/amigo`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
}

export async function index() {
  const res = await fetch(`${BASE_URL}/user/amigos`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
}

export async function addAmigo(amigoId) {
  const res = await fetch(`${BASE_URL}/user/add-amigo/${amigoId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ amigoId }),
  });
  return res.json();
}

export async function deleteAmigo(amigoId) {
  const res = await fetch(`${BASE_URL}/user/remove-amigo/${amigoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
}
