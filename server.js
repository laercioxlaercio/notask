const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  { id: '1', title: 'Build an Android App', tasks: [] },
  { id: '2', title: 'Build a Spaceship', tasks: [] },
  { id: '3', title: 'Build a Time Machine', tasks: [] },
];

server.use((req, res, next) => {
  console.count('Total requests');

  return next();
});

function checkProjectExists (req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id === id);

  if(!project) {
    return res.status(400).json({ error: 'Project not found'});
  }

  return next();
};

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(project);

});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  
  projects.splice(projectIndex, 1);

  return res.json(projects);

});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.tasks.push(title);

  return res.json(project);
});

const port = 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));