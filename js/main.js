

$(document).ready(function() {
  console.log("DOM ready");
  
  if ('serviceWorker' in navigator)
  {
    navigator.serviceWorker.register('sw.js').then( (registration)=> {
      console.log('Service worker registration successful, scope is:', registration.scope);
    })
    .catch( (error)=> {
      console.log('Service worker registration failed, error:', error);
    });
  }

});

$(document).on("mobileinit", function() {
  console.log("mobileinit");
});

$(document).on("pagecreate", "#index", function() {
  console.log("pagecreate - #index");
  console.log("start main()");
  main();
});



function main()
{
  main.version_desc = "2021-2022"
  main.version_main = 2
  main.version_sub = 0

  
  main.rasp = {
    0: 0,
    1: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русский язык А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9Д Русский язык Б1" },
         { 0: 0 },
         { 0: 0 },
         { 0: 0 },
         { 0: [12, 20], 1: [13, 00], 2: "9В Русский язык А103" }
       ],
    2: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русская словесность А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9В Русский язык А103" },
         { 0: [09, 40], 1: [10, 20], 2: "7М Литература А403" },
         { 0: [10, 30], 1: [11, 10], 2: "9В Литература А103" },
         { 0: [11, 30], 1: [12, 10], 2: "11НДО Русский язык" },
         { 0: [12, 20], 1: [13, 00], 2: "11НДО Литература" }
       ],
    3: [
         { 0: [08, 00], 1: [08, 40], 2: "9Д Русский язык Б1" },
         { 0: [08, 50], 1: [09, 30], 2: "7М Родной язык А403" },
         { 0: [09, 40], 1: [10, 20], 2: "9Д Русский язык Б1" },
         { 0: [10, 30], 1: [11, 10], 2: "9Д Литература Б1" },
         { 0: [11, 30], 1: [12, 10], 2: "9В Русский язык А103" },
         { 0: [12, 20], 1: [13, 00], 2: "9В Литература А103" }
       ],
    4: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русский язык А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9В Родной язык А103" },
         { 0: [09, 40], 1: [10, 20], 2: "9Д Литература Б1" },
         { 0: [10, 30], 1: [11, 10], 2: "9Д Родной язык Б1" },
         { 0: [11, 30], 1: [12, 10], 2: "11НДО Русский язык" },
         { 0: 0 },
    ],
    5: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русский язык А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9Д Литература Б1" },
         { 0: [09, 40], 1: [10, 20], 2: "9Д Культура речи Б1" },
         { 0: [10, 30], 1: [11, 10], 2: "9В Литература А103" },
         { 0: [11, 30], 1: [12, 10], 2: "9В Культура речи А103" },
         { 0: [12, 15], 1: [12, 55], 2: "7М Литература А403" },
         { 0: [13, 05], 1: [13, 45], 2: "11НДО Литература" }
    ],
    6: 0
  }
  
  form_time_minutes();
    
  //console.log(main.rasp);
  
  main.audio1 = $('#acr-urv-id-audio-prebuzz')[0];
  main.audio2 = $('#acr-urv-id-audio-buzz')[0];
  
  main.audio1.volume = 1.0;
  main.audio2.volume = 1.0;
  
  
  main.cday_p = -1;
  main.cdmin_p = -1;
  main.tt_p = -1;
  main.cday_list = 0;
  
  main.sec_blink = true;
  
  //----------------------------------
  
  $("#acr-urv-id-data").click(function() {
    document.documentElement.webkitRequestFullScreen();
  });

  $("#acr-urv-id-time").click(function() {
    $("body").pagecontainer( "change", "#settings" );
  });
  
  setInterval(clock_sec, 1000);
  
  
}

function int2str(i) { if (i < 10) { i = '0' + i } return i; }

function form_time_minutes()
{
  main.days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  main.month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  main.monthe = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  
  for(var i = 0; i < 7; i++)
  {
    cdl = main.rasp[i];
    if (cdl)
    {
      for(var j = 0; j < 6; j++)
      {
        u = cdl[j];
        if (u[0])
        {
          u["tb"] = u[0][0] * 60 + u[0][1];
          u["te"] = u[1][0] * 60 + u[1][1];
        }
      }
    }
  }
}


function clock_sec()
{
  cdt = new Date();
  
  md = cdt.getDate();
  mn = cdt.getMonth();
  
  cday = cdt.getDay();
  ch = cdt.getHours();
  cm = cdt.getMinutes();
  
  if (main.sec_blink) $("#spanid-time-razd").removeClass("acr-urv-ui-color-red");
  else $("#spanid-time-razd").addClass("acr-urv-ui-color-red");
  main.sec_blink = !main.sec_blink;
  
  on_time_event(cday, ch, cm);
  
}

function on_time_event(cday, ch, cm)
{
  
  if (cday != main.cday_p)
  { // on day begin
    main.cday_list = main.rasp[cday];
    
    cdt = new Date();
    md = cdt.getDate();
    mn = cdt.getMonth();
    
    $('#acr-urv-id-data').text( md + " " + main.monthe[mn] + " " + main.days [cday] )
 
    form_urok_list();
    
    main.cday_p = cday;
  }
  
  cdmin = (ch * 60) + cm
  if (cdmin != main.cdmin_p)
  { // on minute begin
        
    $('#spanid-time-hour').text( int2str(ch) );
    $('#spanid-time-min').text( int2str(cm) );
    
    form_minute(cday, cdmin)
    main.cdmin_p = cdmin;
  }
  
}


function form_urok_list()
{
  for(var j = 0; j < 6; j++)
  {
    jj = j + 1;
    text = "" + jj + ": ";
    $("#acr-urv-id-ut-" + jj + " p:nth-child(1)").text(text + "-");
    $("#acr-urv-id-ut-" + jj + " p:nth-child(2)").text("нет урока");
  }

  if (main.cday_list)
  {
    for(var j = 0; j < 6; j++)
    {
      jj = j + 1;
      u = main.cday_list[j];
      text = "" + jj + ": ";
      if (u[0])
      {
        text += int2str(u[0][0]) + ":" + int2str(u[0][1]) + " - " + int2str(u[1][0]) + ":" + int2str(u[1][1]);
        text2 = u[2];
        $("#acr-urv-id-ut-" + jj + " p:nth-child(1)").text(text);
        $("#acr-urv-id-ut-" + jj + " p:nth-child(2)").text(text2);
      }
    }
  }
}

function form_minute(cday, cdmin)
{
  if (main.cday_list)
  {
    tt = -1;
    for(var j = 0; j < 6; j++)
    {
      u = main.cday_list[j];
      utb = u["tb"];
      ute = u["te"];
      
      if (cdmin < utb)
      { //before cur urok
        tt = 1;
        tto = utb - cdmin;
        
        break;
      }
      else
      {
        if (cdmin < ute)
        { // in cur urok
          tt = 2;
          tto = ute - cdmin;
          break;
        }
        else
        { // check continue
          
        }
 
      }
    }
    
    
    $("div[id^='acr-urv-id-ut-']").removeClass('acr-urv-ui-border-blue acr-urv-ui-border-green');
    
    jj = j + 1;
    
    switch (tt)
    {
      case -1:
      {
        $('#acr-urv-id-ttext').text( " уроки закончены " );
        $('#acr-urv-id-utime').text( " -- " );
        
        $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
        $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
        
        if (main.tt_p == 2)
        {
          main.audio2.play();
        }
       
        break;
      }
      
      case 1:
      {
        $('#acr-urv-id-ut-'+jj).addClass('acr-urv-ui-border-blue');
        $('#acr-urv-id-ttext').text( "До начала урока" );
        $('#acr-urv-id-utime').text( int2str(tto) );
        
        $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
        $('#acr-urv-id-ttext').addClass("acr-urv-ui-color-blue");

        $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
        $('#acr-urv-id-utime').addClass("acr-urv-ui-color-blue");

        
        if (tto == 3)
        {
          main.audio1.play();
        }
        if (tto == 2)
        {
          main.audio1.play();
        }
        if (tto == 1)
        {
          main.audio1.play();
        }
        if (main.tt_p == 2)
        {
          main.audio2.play();
        }
        
        break;
      }
      
      case 2:
      {
        $("#acr-urv-id-ut-"+jj).addClass("acr-urv-ui-border-green");
        $('#acr-urv-id-ttext').text( "До конца урока" );
        $('#acr-urv-id-utime').text( int2str(tto) );
        
        $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
        $('#acr-urv-id-ttext').addClass("acr-urv-ui-color-green");

        $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
        $('#acr-urv-id-utime').addClass("acr-urv-ui-color-green");

        
        if (tto == 3)
        {
          main.audio1.play();
        }
        if (tto == 2)
        {
          main.audio1.play();
        }
        if (tto == 1)
        {
          main.audio1.play();
        }
        if (main.tt_p == 1)
        {
          main.audio2.play();
        }

        
        break;
      }

    }
    main.tt_p = tt;
    
    //console.log("urok:", jj, ", tt:" + tt);
     
  }
}






