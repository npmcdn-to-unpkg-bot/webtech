function (doc) {
  if (doc.type == 'item') {
    if (doc.lent == 'false') {
      emit(null, doc);
    }
  }
};
