var model = (function () {
  var _placholder = function (pageID) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      $("#app").html(data);
    });
  };
  return {
    placholder: _placholder,
  };
})();
