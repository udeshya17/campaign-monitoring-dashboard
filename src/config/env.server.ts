function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing ${name}. Add it to .env.local`);
  return val;
}

export const envServer = {
  API_BASE_URL: required("API_BASE_URL").replace(/\/+$/, ""),
};


