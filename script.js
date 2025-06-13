document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var form = e.target;
    var formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbxsKvTmQI6vS06YYdv85cm2pV2ZQJXXg4BMI8EZjASOdfiumeUhNPEWvcV9RfFFmQy4/exec", {
    method: "POST",
    body: formData
    })
    .then(function(response) {
    return response.text();
    })
    .then(function(data) {
    document.getElementById("notification").style.display = "block";

    // Optional: reset form after submission
    form.reset();

    })
    .catch(function(error) {
    console.error(error);
    alert("There was a problem submitting your order.");
    });
});