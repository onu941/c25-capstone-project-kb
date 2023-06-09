export async function localLogin(name: string, phone: string, email: string) {
  const res = await fetch(`http://localhost:3000/user/login`, {
    // need help setting process.env
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phone,
      email,
    }),
  });

  const result = await res.json();
  if (res.status === 201 || res.status === 200) {
    localStorage.setItem("token", result.token);
    return true;
  } else {
    return false;
  }
}
