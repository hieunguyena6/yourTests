$(document).ready(function() {
  countQuestionSum();
});

function countQuestionSum() {
  var sum = document.querySelectorAll('#left-layer .question-box').length;
  $('#question-sum').text(sum);
}

// Remove question action
$(document).on("click", ".button-remove", function() {
  $(this).parent().parent().remove();
  countQuestionSum();
});
// Add question action
$(document).ready(function() {
  $(".button-add").click(function() {
    $(this).parent().parent().clone().appendTo("#left-layer");
    var wrap = $('#left-layer').find('.question-box:last');
    $('.button-add', wrap).parent().remove();
    var buttonRemove = ('<div><label class="question-num">Cau1:</label><button class="button-remove">Xóa</button></div>');
    $(wrap).prepend($(buttonRemove));

    countQuestionSum();
  });
});

// Open Tabs
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Remove question selector
