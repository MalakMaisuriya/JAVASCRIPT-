$(document).ready(function () {
  let boxCount = parseInt(prompt("How many input boxes do you want? (Max 100)", "5"));

  if (isNaN(boxCount) || boxCount <= 0) {
    alert("Invalid number! Defaulting to 5 boxes.");
    boxCount = 5;
  } else if (boxCount > 100) {
    alert("⚠️ You cannot create more than 100 boxes. Defaulting to 100.");
    boxCount = 100;
  }

  for (let i = 1; i <= boxCount; i++) {
    $("#box-container").append(`<input type="number" id="box${i}" class="input-box">`);
  }

  $("#random").on("click", function () {
    $(".input-box").removeClass("highlight");
    for (let i = 1; i <= boxCount; i++) {
      $(`#box${i}`).val(Math.floor(Math.random() * 100));
    }
    $("#result").text("");
  });

  $("#clear").on("click", function () {
    $(".input-box").val("");
    $(".input-box").removeClass("highlight");
    $("#result").text("");
  });

  $("#max").on("click", function () {
    let max = -Infinity, maxId = null;
    $(".input-box").removeClass("highlight");
    for (let i = 1; i <= boxCount; i++) {
      let val = parseInt($(`#box${i}`).val());
      if (!isNaN(val) && val > max) { max = val; maxId = `#box${i}`; }
    }
    if (maxId) $(maxId).addClass("highlight");
    $("#result").text(`Max: ${max}`);
  });

  $("#min").on("click", function () {
    let min = Infinity, minId = null;
    $(".input-box").removeClass("highlight");
    for (let i = 1; i <= boxCount; i++) {
      let val = parseInt($(`#box${i}`).val());
      if (!isNaN(val) && val < min) { min = val; minId = `#box${i}`; }
    }
    if (minId) $(minId).addClass("highlight");
    $("#result").text(`Min: ${min}`);
  });

  $("#sum").on("click", function () {
    let sum = 0;
    $(".input-box").removeClass("highlight");
    for (let i = 1; i <= boxCount; i++) {
      let val = parseInt($(`#box${i}`).val());
      if (!isNaN(val)) sum += val;
    }
    $("#result").text(`Sum: ${sum}`);
  });

  $("#avg").on("click", function () {
    let sum = 0, count = 0;
    $(".input-box").removeClass("highlight");
    for (let i = 1; i <= boxCount; i++) {
      let val = parseInt($(`#box${i}`).val());
      if (!isNaN(val)) { sum += val; count++; }
    }
    let avg = count ? (sum / count).toFixed(2) : 0;
    $("#result").text(`Average: ${avg}`);
  });
});