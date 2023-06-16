export async function localLogin(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER}/user/login`, {
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
    return { status: true, token: result.token };
  } else {
    return { status: false };
  }
}

export async function localSignup(
  name: string,
  email: string,
  phone: string,
  password: string
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER}/user/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    }
  );

  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    return { status: result };
  }
}
