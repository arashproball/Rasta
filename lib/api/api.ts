const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function sendOtp(phone: string) {
  console.log(JSON.stringify({ phone }));
  const res = await fetch(`${API_BASE}/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در ارسال کد");
  }

  return res.json(); // { code: string, expiresAt: string }
}

export async function verifyOtp(phone: string, code: string) {
  const res = await fetch(`${API_BASE}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "کد نامعتبر است");
  }

  return res.json();
}
export async function verifyToken(token: string) {
  const res = await fetch(`${API_BASE}/auth/verify-token`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "توکن نامعتبر است");
  }
  return true;
}
export async function addName(name: string, token: string): Promise<Response> {
  return await fetch(`${API_BASE}/auth/add-name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🛡 token from localStorage
    },
    body: JSON.stringify({ name }),
  });
}