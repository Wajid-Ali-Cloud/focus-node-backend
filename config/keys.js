const db = {
  username: "wajid_bhatti",
  password: "112233qazwsX*",
  database: "focus",
  cluster: "cluster0",
};

const uri = `mongodb+srv://${db.username}:${db.password}@${db.cluster}.2ingg.mongodb.net/${db.database}?retryWrites=true&w=majority`;

module.exports = uri;