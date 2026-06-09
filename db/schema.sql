CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name TEXT,
  type TEXT,
  mission TEXT
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER,
  title TEXT,
  summary TEXT
);
