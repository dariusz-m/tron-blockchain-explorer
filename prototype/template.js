$('#btn-search').click(function(){
  
    $('#btn-search').addClass('btn-lowered');  
    $('.inner-container').addClass('elevated');
    
    
      if($('.loading').hasClass('loaded')){
            $('.loading').removeClass('loaded');
              setTimeout(function(){  
               $('.loading').addClass('loaded');
           }, 10000);
         }
       
        if ($('#search-bar').val() === '27jXY5ZL6qWYFn4qNSda4H4sUu5zURb5sC3'){
          
        $('.result-block-hash').addClass('hidden');   
        $('.result-block .data-piece:eq(2), .result-block .data-piece:eq(3),  .result-block .data-piece:eq(6),  .result-block .data-piece:eq(7)').removeClass('hidden');  
        $('.result-title-side').removeClass('hidden');   
          
        $('#h3-main').text('Account');    
        $('#search-result').text('27jXY5ZL6qWYFn4qNSda4H4sUu5zURb5sC3');   
        $('#data-main').text('280 037 TRX (0 frozen)');      
        $('#h3-secondary').text('Recent Transactions');   
          
          
      }
    else if ($('#search-bar').val() === '53402'){
      
        $('.result-block-hash').removeClass('hidden'); 
            $('.result-block .data-piece:eq(2), .result-block .data-piece:eq(3),  .result-block .data-piece:eq(6),  .result-block .data-piece:eq(7)').removeClass('hidden');  
          
      
      
        $('#h3-main').text('Block height');    
        $('#search-result').text('53402');  
        $('#data-main').text('5 minutes ago'); 
        $('#h3-secondary').text('Transactions');
  
         $('.result-title').text('1 043  TRX');     
         $('.result-title:eq(1)').text('9 328 355 258  TRX'); 
         $('.result-title-side').addClass('hidden'); 
         $('#result-icon-status').addClass('hidden'); 
      }
    else if ($('#search-bar').val() === 'randomcoin'){
      
        $('.result-block-hash').addClass('hidden');   
        $('.result-block .data-piece:eq(2), .result-block .data-piece:eq(3),  .result-block .data-piece:eq(6),  .result-block .data-piece:eq(7)').addClass('hidden');   
  
      
        $('.result-title-side').removeClass('hidden');   
      
      
        $('.result-title').text('5 555 555 555');     
        $('.result-title:eq(1)').text('4 444 444 444');    
        $('.result-title-side').text('50.1% total');   
        $('.result-title-side:eq(1)').text('40.9% total');   
      
        $('#h3-main').text('Token');     
        $('#search-result').text('randomcoin');   
        $('#data-main').text('9 999 999 (100% issued)');   
        $('#h3-secondary').text('Holders');
      }
    
    setTimeout(function(){  
      $('.results').addClass('visible'); 
    }, 150);
    
      setTimeout(function(){  
      $('.loading').addClass('loaded'); 
        $('.dummy-example').addClass('dummy'); 
    }, 1500);
   });
  
  
  $('#search-bar').on('keyup',function(){
    
      if ($('#search-bar').val()){
        $('#btn-search').addClass('btn-lowered');      
      }else{
        $('#btn-search').removeClass('btn-lowered');      
      }
    
    if ($('#search-bar').val()){
        $('#btn-search').addClass('btn-lowered');      
      }else{
        $('#btn-search').removeClass('btn-lowered');      
      }
    
  });
  
  
  
  function copyToClipboard(elementId) {
  
    // Create an auxiliary hidden input
    var aux = document.createElement("input");
  
    // Get the text from the element passed into the input
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
  
    // Append the aux input to the body
    document.body.appendChild(aux);
  
    // Highlight the content
    aux.select();
  
    // Execute the copy command
    document.execCommand("copy");
  
    // Remove the input from the body
    document.body.removeChild(aux);
  
  }
  
  