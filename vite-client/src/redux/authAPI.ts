export async function localLogin(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER}/user/login`, {
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
    localStorage.setItem("token", result.token);
    return true;
  } else {
    return false;
  }
}
