function (doc) {
  if (doc.type == 'item') {
    emit(null, doc);
  }
};
