//event for signup
$('#main-form button').on('click', function(e){
  e.preventDefault();
  var formData = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }
  if (this.id === 'signup') {
    signup(formData);
  }else if(this.id === 'login') {
    login(formData);
  }
})

function signup(data){
  $.ajax({
    url: './users',
    method: 'POST',
    data: data,
    success: function(response, status, xhr){
      localStorage.setItem('x-auth', xhr.getResponseHeader('x-auth'));
      localStorage.setItem('x-id', response._id);
      window.location.href = './book.html'
    },
    error: function(){
      alert('err');
    }
  })
}

function login(data) {
  $.ajax({
    url: './users/login',
    method: 'POST',
    data: data,
    success: function(response, status, xhr){
      localStorage.setItem('x-auth', xhr.getResponseHeader('x-auth'));
      localStorage.setItem('x-id', response._id);
      window.location.href = './book.html'
    },
    error: function(){
      alert('err');
    }
  })
}