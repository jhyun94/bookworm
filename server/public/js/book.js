$('.logout').on('click', function(e) {
  $.ajax({
    url: `./users/${localStorage.getItem('x-id')}`,
    method: 'DELETE',
    success: function(response, status, xhr){
      localStorage.removeItem('x-auth');
      localStorage.removeItem('x-id');
      window.location.href = './index.html'
    },
    error: function(err){
      alert('error');
    }
  })
})