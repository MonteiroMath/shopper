export async function client(endpoint, method, body) {
  const baseUrl = "http://localhost:3000";
  const headers = { "Content-Type": "application/json" };
  const mode = "cors";

  const config = {
    method,
    headers,
    mode,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(baseUrl + endpoint, config);

  const data = await response.json();
  return data;
}

client.validate = async function (body) {
  return client("/validate", "POST", body);
};

client.update = async function (body) {
  return client("/update", "PUT", body);
};
