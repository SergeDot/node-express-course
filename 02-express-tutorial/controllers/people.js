let { people } = require('../data');

const getPeople = (_, res) => {
  res.json(people);
};

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: 'Please provide a name' });
  };
  people.push({ id: people.length + 1, name: name });
  res.status(201).json({ success: true, name: name });
};

const getPerson = (req, res) => {
  const { id } = req.params;
  const person = people.find(person => person.id === Number(id));
  if (!person) {
    return res.status(404)
      .json({ success: false, msg: `Nobody with id ${id}` });
  };
  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find(person => person.id === Number(id));
  if (!person) {
    return res.status(404)
      .json({ success: false, msg: `Nobody with id ${id}` });
  };
  people.map(person => person.id === Number(id) ? person.name = name : '');
  res.status(200).json({ success: true, data: people });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find(person => person.id === Number(id));
  if (!person) {
    return res.status(404)
      .json({ success: false, msg: `Nobody with id ${id}` });
  };
  const newPeople = people.filter(person => person.id !== Number(id));
  res.status(200).json({ success: true, data: newPeople });
};


module.exports = { getPeople, addPerson, getPerson, updatePerson, deletePerson };
