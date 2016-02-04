function (doc) {
  if (doc.type == 'item') {
    if (doc.lend == false) {
      emit(null, doc);
    }
  }
};
