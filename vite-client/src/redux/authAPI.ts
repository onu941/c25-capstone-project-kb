export async function localLogin(email: string, password: string) {
  console.log(
    "localLogin called with email:",
    email,
    "and password:",
    password
  );
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
    console.log("localLogin success: token stored in localStorage");
    return true;
  } else {
    console.log("localLogin failed with status:", res.status);
    return false;
  }
}
