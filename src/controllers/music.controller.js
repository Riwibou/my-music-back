const { Music } = require('../databases/music.database');

exports.addMusic = async (req, res) => {
  try {
    const music = new Music(req.body);
    await music.save();
    res.status(201).send(music);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!music) {
      return res.status(404).send({ error: 'Music not found' });
    }
    res.send(music);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndDelete(req.params.id);
    if (!music) {
      return res.status(404).send({ error: 'Music not found' });
    }
    res.send({ message: 'Music deleted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send({ error: 'Music not found' });
    }
    res.send(music);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAllMusic = async (req, res) => {
  try {
    const music = await Music.find({});
    res.send(music);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
