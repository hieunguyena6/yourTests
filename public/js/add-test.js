$(document).ready(function() {
  countQuestionSum();
});

function countQuestionSum() {
  var sum = document.querySelectorAll('#left-layer .question-box').length;
  $('#question-sum').text(sum);
}

// Remove question action
$(document).on("click", ".button-remove", function() {
  var ques = $(this).parent().parent().clone();
  var id_input = $('input', ques).first();
  var div_cau = $('div', ques).first();
  $(id_input).remove();
  $(div_cau).remove();
  var button_add = ('<button type="button" class="button-add">Thêm</button>');
  $('div', ques).first().prepend($(button_add));
  ques.appendTo("#right-layer #handwork");
  $(this).parent().parent().remove();
  CalculateQuestionOrder();
  countQuestionSum();
});
// Add question action
$(document).on("click", ".button-add", function() {
    var ques = $(this).parent().parent().clone();
    var id = $('p', ques).first().text();
    var input = '<input value = ' + id + ' name = "ques[]" style= "display : none" >';
    $(ques).prepend($(input));
    ques.appendTo("#left-layer");
    var wrap = $('#left-layer').find('.question-box:last');
    $('.button-add', wrap).remove();
    var buttonRemove = ('<div><label class="question-num"></label><button class="button-remove" type="button">Xóa</button></div>');
    $(wrap).prepend($(buttonRemove));
    $(this).parent().parent().remove();
    CalculateQuestionOrder();
    countQuestionSum();
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

//Calculate numberic order of question
function CalculateQuestionOrder(){
  var number= document.getElementsByClassName("question-num");
  for (i = 0; i < number.length; i++) {
    number[i].textContent='Câu '+(i+1);
 }
};
