const { ItemsModel } = require('../models/Items');

exports.index = async (req, res) => {
  const items = await ItemsModel.find().sort({ createdAt: -1 });
  return res.status(200).json(items);
};

exports.show = async (req, res) => {
  const item = await ItemsModel.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  return res.status(200).json(item);
};

exports.store = async (req, res) => {
  const item = await ItemsModel.create(req.body);
  return res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await ItemsModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  return res.status(200).json(item);
};

exports.destroy = async (req, res) => {
  const item = await ItemsModel.findByIdAndDelete(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  return res.status(204).send();
};
