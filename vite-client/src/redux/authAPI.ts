export async function localLogin(email: string, password: string) {
  const res = await fetch(`http://localhost:3000/user/login`, {
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
  if (res.status === 200) {
    localStorage.setItem("token", result.token);
    return true;
  } else {
    return false;
  }
}
