const apiBaseURL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/+$/, "");

export type LoginResponse = {
  token: string;
  username: string;
  id: string;
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
): Promise<void> => {
  const response = await fetch(`${apiBaseURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user (HTTP ${response.status})`);
  }
};

export const getAuthToken = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${apiBaseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorBody: { message?: unknown } = await response
      .json()
      .catch(() => ({}));
    const message =
      typeof errorBody.message === "string"
        ? errorBody.message
        : `Failed to log in (HTTP ${response.status})`;
    throw new Error(message);
  }

  const data: {
    token?: unknown;
    username?: unknown;
    id?: unknown;
  } = await response.json();
  if (
    typeof data.token !== "string" ||
    !data.token ||
    typeof data.username !== "string" ||
    !data.username ||
    typeof data.id !== "string" ||
    !data.id
  ) {
    throw new Error("Login response did not include the expected user details.");
  }
  return { token: data.token, username: data.username, id: data.id };
};
