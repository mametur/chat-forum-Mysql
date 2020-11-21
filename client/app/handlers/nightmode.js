export  const nightMode = (e) => {
      debugger;
      var toggle = document.querySelector('input[name=mode]');
      if (toggle.checked) {
        document.body.style.backgroundColor='#2c3466';
        document.getElementById('chat').style.backgroundImage= 'url(https://i.pinimg.com/originals/48/11/59/48115973562e4574ebf7a0192f51eda3.jpg)';
        document.getElementById('container').style.backgroundColor = '#5e616a';
        document.getElementById('container').style.color= 'white'
        document.getElementById('chat').blur();
        document.getElementById('header').style.color= 'white';
        
      } else {
       document.body.style.backgroundColor = ' #4c5380'
       document.getElementById('container').style.backgroundColor = 'white';
      document.getElementById('chat').style.backgroundImage= 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)';
      document.getElementById('header').style.color = 'gray';
      }
    };
