function (doc) {
  if (doc.type == 'lending') {
    emit(null, doc);
  }
};
