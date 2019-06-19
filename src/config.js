let environment = "development";

let config = {
  url:
    environment == "development"
      ? "http://localhost:3000"
      : "https://soundbolt.me"
};

export default config;
