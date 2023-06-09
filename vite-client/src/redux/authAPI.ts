export async function localLogin(email: string, password: string) {
  const res = await fetch(`http://localhost:3000/user/login`, {
    // need help setting process.env
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await res.json();
  if (res.status === 201 || res.status === 200) {
    // why 201 and not 200
    localStorage.setItem("token", result.token);
    return true;
  } else {
    return false;
  }
}
