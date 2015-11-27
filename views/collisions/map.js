function (doc) {
  if (doc.type == 'lending') {
    if (doc.qstart && doc.qend) {
      if (doc.qend < doc.start || doc.qstart > doc.end) {
      }
      else {
        emit(null, doc);
      }
    }
  }
};
