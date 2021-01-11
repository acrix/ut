

if ('serviceWorker' in navigator)
{
  navigator.serviceWorker.register('jssw/sw.js', {scope: '.'}).then( (registration)=> {
    console.log('Service worker registration successful, scope is:', registration.scope);
  })
  .catch( (error)=> {
    console.log('Service worker registration failed, error:', error);
  });
}


$(document).ready(function() {
  console.log("DOM ready");
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
  main.version_main = 1
  main.version_sub = 0
    
  main.rasp = {
    0: 0,
    1: [
         { 0: [08, 00], 1: [08, 40], 2: "8В Русский язык" },
         { 0: [08, 50], 1: [09, 30], 2: "8Д Русский язык" },
         { 0: [09, 40], 1: [10, 20], 2: "8Д Родной язык" },
         { 0: [10, 35], 1: [11, 15], 2: "8В Родной язык" },
         { 0: [11, 35], 1: [12, 15], 2: "5А Русский язык" },
         { 0: 0 }
       ],
    2: [
         { 0: 0 },
         { 0: [08, 50], 1: [09, 30], 2: "5А Русский язык" },
         { 0: [09, 40], 1: [10, 20], 2: "8В Русский язык" },
         { 0: 0 },
         { 0: [11, 35], 1: [12, 15], 2: "5А Русский язык" },
         { 0: 0 }
       ],
    3: [
         { 0: [08, 00], 1: [08, 40], 2: "5А Русский язык" },
         { 0: [08, 50], 1: [09, 30], 2: "8В Русский язык" },
         { 0: [09, 40], 1: [10, 20], 2: "8Д Русский язык" },
         { 0: [10, 45], 1: [11, 25], 2: "5А Литература" },
         { 0: [11, 25], 1: [12, 05], 2: "8Д Литература" },
         { 0: [12, 15], 1: [12, 55], 2: "8В Литература" }
       ],
    4: [
         { 0: [08, 00], 1: [08, 40], 2: "8Д Русский язык" },
         { 0: 0 },
         { 0: [09, 45], 1: [10, 25], 2: "5А Родной язык" },
         { 0: 0 },
         { 0: 0 },
         { 0: 0 }
       ],
    5: [
         { 0: [08, 00], 1: [08, 40], 2: "5А Русский язык" },
         { 0: [08, 50], 1: [09, 30], 2: "8В Русский язык" },
         { 0: [09, 45], 1: [10, 25], 2: "5А Литература" },
         { 0: [10, 35], 1: [11, 15], 2: "8Д Русский язык" },
         { 0: [11, 25], 1: [12, 05], 2: "8В Литература" },
         { 0: [12, 15], 1: [12, 55], 2: "8Д Литература" }
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
  
  //----------------------------------
  
  $("#acr-urv-id-data").click(function() {
    document.documentElement.webkitRequestFullScreen();
  });

  
  setInterval(clock_sec, 1000);
  
  
}

function int2str(i) { if (i < 10) { i = '0' + i } return i; }

function form_time_minutes()
{
  main.days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  main.month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  
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
    
    $('#acr-urv-id-data').text( md + " " + main.month[mn] )
 
    form_urok_list();
    
    main.cday_p = cday;
  }
  
  cdmin = (ch * 60) + cm
  if (cdmin != main.cdmin_p)
  { // on minute begin
    
    $('#acr-urv-id-time').text( int2str(ch) + ":" + int2str(cm) )
    
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
    
    console.log("urok:", jj, ", tt:" + tt);
     
  }
}






