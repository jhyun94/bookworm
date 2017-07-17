//event for signup
$('#main-form').on('submit', function(e){
  e.preventDefault();
  var formData = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }
  $.ajax({
    url: './users',
    method: 'POST',
    data: formData,
    success: function(response, status, xhr){
      localStorage.setItem('x-auth', xhr.getResponseHeader('x-auth'));
      localStorage.setItem('x-id', response._id);
      window.location.href = './book.html'
    },
    error: function(){
      alert('err');
    }
  })
})

