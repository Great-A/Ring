$(document).ready(function(){
	$("#carouselExampleIndicators").carousel({
		interval : false
	});
});

let formButton = document.getElementById("form-button")
let pages = document.getElementsByClassName("page")
let submit = document.getElementById("submit-button")

// Dugme za Help 
let openButton = document.getElementById("open-help")
let closeButton = document.getElementById("close-help")
let helpText = document.getElementById("help")

// Dugme za CVV
let openCvv = document.getElementById("questionmark")
let closeCvv = document.getElementById("close-cvv")
let cvvText = document.getElementById("cvv-holder")

// Forma povecanje visine
let form = document.getElementById("form")
let inputs = document.getElementsByClassName("page-2-item")
let extraButton = document.getElementById("extrabilling")
let extraLabel = document.getElementById("extrabilling-label")
let billingHolder = document.getElementById("billing-holder")
let billingInputs = document.getElementsByClassName("billing")

// Dugmici za nacin placanja
let onePay = document.getElementById("1pay")
let threePay = document.getElementById("3pay")

// Validacija prve strane 
let fname = document.getElementById("firstname")
let lname = document.getElementById("lastname")
let email = document.getElementById("email")
let phone = document.getElementById("phoneNumber")

// Validacija druge strane 
let shipping1 = document.getElementById("shippingAddress1")
let shipping2 = document.getElementById("shippingAddress2")
let sCity = document.getElementById("city")
let sState = document.getElementById("state")
let sZip = document.getElementById("zip")
let sCountry = document.getElementById("country")
let creditCard = document.getElementById("creditcard")
let CVV = document.getElementById("cvv")
let expDate = document.getElementById("expdate")
let cardsImg = document.getElementById("cards-img")

// Dodavanje crtica 
var $form = $("#form");
var $phone = $form.find("#phoneNumber");
var $expDate = $form.find("#expdate");

formButton.addEventListener("click", () => {
  if (fname.value == "" || lname.value == "" || email.value == "" || phone.value == "") {
    return
  } else if (onePay.checked == false && threePay.checked == false) {
    alert("Please select a payment method");
    var target = "#buy-section";
    var scrollToPosition = $(target).offset().top;

    $('html, body').stop().animate({
      scrollTop: scrollToPosition
    }, 600, function () {
      location.hash = target;
    });
    return
  }

  event.preventDefault()
  pages[1].classList.remove("hidden")
  pages[0].classList.add("hidden")
  submit.classList.remove("hidden")
  formButton.classList.add("hidden")
  form.style.height = "615px"

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    setTimeout(() => {
      input.style.opacity = 1
    }, 300);
  }

  setTimeout(() => {
    submit.style.opacity = 1
  }, 300);

  setTimeout(() => {
    extraLabel.style.opacity = 1
  }, 300);

  setTimeout(() => {
    extraButton.style.opacity = 1
  }, 300);

  setTimeout(() => {
    openCvv.style.opacity = 1
  }, 300);

  setTimeout(() => {
    cardsImg.style.opacity = 1
  }, 300);
})

extraButton.addEventListener("click", () => {
  // event.preventDefault()

  if (form.style.height == "615px") {
    billingHolder.classList.remove("hidden")
    submit.style.transition = "none"
    submit.style.opacity = 0

    for (let i = 0; i < billingInputs.length; i++) {
      const input = billingInputs[i];

      setTimeout(() => {
        input.style.opacity = 1
      }, 300);
    }
    setTimeout(() => {
      submit.style.opacity = 1
    }, 300);

    form.style.height = "825px"
  } else if (form.style.height == "825px") {
    extraButton.checked = false
    billingHolder.classList.add("hidden")

    for (let i = 0; i < billingInputs.length; i++) {
      const input = billingInputs[i];

      setTimeout(() => {
        input.style.opacity = 0
      }, 300);
    }

    setTimeout(() => {
      submit.style.opacity = 1
    }, 300);

    submit.style.opacity = 0

    form.style.height = "615px"
  }
})

openButton.addEventListener("click", () => {
  helpText.classList.remove("hidden")
})

closeButton.addEventListener("click", () => {
  helpText.classList.add("hidden")
})

openCvv.addEventListener("click", () => {
  cvvText.classList.remove("hidden")
})

closeCvv.addEventListener("click", () => {
  cvvText.classList.add("hidden")
})

// function validateCardNumber() {
//   document.getElementById("form").submit()
// }

function validate() {
  if (shipping1.value == "" || shipping2.value == "" || sCity.value == "" ||
    sState.value == "" || sZip.value == "" || sCountry.value == "" ||
    creditCard.value == "" || CVV.value == "" || expDate == "") {
    return
  } else {
    window.location.href = "thank-you.html"
  }
}

function validateCardNumber() {
  let number = document.querySelector('#creditcard').value;
  let creditCard = document.getElementById("creditcard")
  var regex = new RegExp("^[0-9]{16}$");
  var cardno = /^(?:3[47][0-9]{13})$/;
  if (!regex.test(number) && !cardno.test(number)) {
    alert("Please make sure you entered a valid Credit Card number")
    creditCard.style.border = "3px solid red"
    return false;
  } else if (!ValidateExpDate()) {
    alert("Please make sure you entered a valid Credit Card expiration date")
    return false;
  } else {
    return valid_credit_card(number);
  }
}

function luhnCheck(val) {
  var sum = 0;
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1));
    if (i % 2 == 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  if (!(sum % 10) == 0) {
    alert("Please make sure you entered a valid Credit Card number")
    console.log(sum);
    console.error(sum % 10);
  } else {
    document.getElementById("form").submit()
  }

  // return (sum % 10) == 0;
}


function valid_credit_card(value) {
  // Accept only digits, dashes or spaces
  // if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }
  if (!(nCheck % 10) == 0) {
    alert("luhn new")
    console.log(nCheck);
    console.error(nCheck % 10);
  } else {
    document.getElementById("form").submit()
  }

  // return (nCheck % 10) == 0;
}

window.onload = function () {
  document.getElementById('url').value = window.location.href;
}

$(formButton).click((e) => {
  let prviParametar = $('#firstname').val();
  let drugiParametar = $('#lastname').val();
  let treciParametar = $('#email').val();
  let cetvrtiParametar = $('#phoneNumber').val();
  if (ValidateUSPhoneNumber()) {
    $.ajax({
      method: 'POST',
      url: 'https://secure.mylineage.com/app/marketing/+P8bE3X^M7DE_insert.php',
      dataType: 'JSON',
      data: {
        firstname: prviParametar, //moze da se zove isto kao i gore
        lastname: drugiParametar, //sa leve strane je kako ce ga oni dobiti
        email: treciParametar, // sa desne je sta ti saljes (kako si ih privatio)
        phoneNumber: cetvrtiParametar
      },
      success: (res) => {
        console.log(res) //ovo ce biti prazno jer se okida kada se parametri uspesno posalju i dobije se odgovor servera
      },
      error: (err) => {
        console.log(err) //ovo ce ce isto biti prazno ili ce se obraditi neka greska
      }
    })
  } else {
    pages[1].classList.add("hidden")
    pages[0].classList.remove("hidden")
    submit.classList.add("hidden")
    formButton.classList.remove("hidden")
    form.style.height = "500px"
  }
})

function ValidateUSPhoneNumber() {
  let phoneNumber = document.getElementById("phoneNumber").value
  var regExp = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/;
  var phoneVal = phoneNumber.match(regExp);
  if (phoneVal) {
    return true;
  }
  phone.style.border = "3px solid red"
  return false;
}

function ValidateExpDate() {
  let expDateTest = expDate.value;
  var regExp = /^\d{2}\/\d{2}$/;
  var expeVal = expDateTest.match(regExp);
  if (expeVal) {
    return true;
  }
  expDate.style.border = "3px solid red"
  return false;
}

$phone.on("keyup", function (event) {

  // 1.
  var selection = window.getSelection().toString();
  if (selection !== '') {
    return;
  }

  // 2.
  if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
    return;
  }
  // 1
  var $this = $(this);
  var input = $this.val();

  // 2
  input = input.replace(/[\W\s\._\-]+/g, '');

  // 3
  var split = 2;
  var chunk = [];

  for (var i = 0, len = input.length; i < len; i += split) {
    split = (i <= 5) ? 3 : 4;
    chunk.push(input.substr(i, split));
  }

  // 4
  $this.val(function () {
    return chunk.join("-");
  });
});

$expDate.on("keyup", function (event) {

  // 1.
  var selection = window.getSelection().toString();
  if (selection !== '') {
    return;
  }

  // 2.
  if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
    return;
  }
  // 1
  var $this = $(this);
  var input = $this.val();

  // 2
  input = input.replace(/[\W\s\._\-]+/g, '');

  // 3
  var split = 2;
  var chunk = [];

  for (var i = 0, len = input.length; i < len; i += split) {
    if (i <= 2) {
      split = 2
      chunk.push(input.substr(i, split));
    }
    // else if (i > 5) {
    //   input = input.replace(/[S\W\s\._\-]+/g, '');
    // }

    // split = (i <= 5) ? 2 : 4;
    // chunk.push(input.substr(i, split));
  }

  // 4
  $this.val(function () {
    return chunk.join("/");
  });
});

let carousel = document.querySelector(".carousel");
console.log(carousel);

// $(carousel).carousel({
//   interval: 99999999,
// });