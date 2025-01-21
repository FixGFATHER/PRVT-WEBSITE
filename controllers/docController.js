// controllers/docController.js
const Document = require('../models/Document');

exports.getDocuments = async (req, res) => {
  try {
    // Optional: Suchparameter
    const search = req.query.search || "";
    const documents = await Document.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.render('documents', { documents, search });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    // Dateiupload-Handling oder Pfad
    // Angenommen, req.file.filePath wäre der Pfad
    const { title, description, category, tags } = req.body;
    const doc = new Document({
      title,
      description,
      filePath: "fake/path/to/file.pdf", // Beispiel
      category,
      tags: tags.split(','),
      uploadedBy: req.user._id
    });
    await doc.save();
    res.redirect('/documents');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
