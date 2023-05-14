export default async function api(endpoint, method, body) {
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

api.validate = async function (body) {
  return api("/validate", "POST", body);
};

api.update = async function (body) {
  return api("/update", "PUT", body);
};
