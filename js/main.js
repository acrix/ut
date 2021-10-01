
Zepto(function($){
  console.log("DOM ready");
  
  set_version()

  $('#page1').addClass('page1-anim-show');
  
  //ServiceWorkerReg();
  
  main();
})


function main()
{
  main.urok_len = 40;

  main.rasp = {
    0: 0,
    1: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русский язык А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9Д Русский язык Б1" },
         { 0: [09, 40], 1: [10, 20], 2: "11НДО Русский язык" },
         { 0: [10, 30], 1: [11, 10], 2: "11НДО Литература" },
         { 0: [11, 30], 1: [12, 10], 2: 0 },
         { 0: [12, 20], 1: [13, 00], 2: "9В Русский язык А103" }
       ],
    2: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русская словесность А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9В Русский язык А103" },
         { 0: [09, 40], 1: [10, 20], 2: "7М Литература А403" },
         { 0: [10, 30], 1: [11, 10], 2: "9В Литература А103" },
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
         { 0: [12, 20], 1: [13, 00], 2: "11НДО Литература" }
    ],
    5: [
         { 0: [08, 00], 1: [08, 40], 2: "7М Русский язык А403" },
         { 0: [08, 50], 1: [09, 30], 2: "9Д Литература Б1" },
         { 0: [09, 40], 1: [10, 20], 2: "9Д Культура речи Б1" },
         { 0: [10, 30], 1: [11, 10], 2: "9В Литература А103" },
         { 0: [11, 30], 1: [12, 10], 2: "9В Культура речи А103" },
         { 0: [12, 15], 1: [12, 55], 2: "7М Литература А403" },
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
  
//  $("#acr-urv-id-data").click(function() {
//    document.documentElement.webkitRequestFullScreen();
//  });

//  $("#acr-urv-id-time").click(function() {
//    $("body").pagecontainer( "change", "#settings" );
//  });
  
  clock_sec();
  //setInterval(clock_sec, 1000);
  
  
}

function int2str(i) { if (i < 10) { i = '0' + i } return i; }

function set_version()
{
  set_version.version_desc = "2021-2022";
  set_version.version_main = 2;
  set_version.version_sub = 1;
  vers = 'ACR ' + set_version.version_desc + ' ' + set_version.version_main + '.' + set_version.version_sub;
  $('#footer').html(vers);
}

function form_time_minutes()
{
  main.days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  main.monthe = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  
  for(var i = 0; i < 7; i++)
  {
    cdl = main.rasp[i];
    if (cdl)
    {
      len = cdl.length
      for(var j = 0; j < len; j++)
      {
        u = cdl[j];
        if (u[2])
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

    $('#date_text').text(md + " " + main.monthe[mn])
    $('#day_text').text(main.days[cday])

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
  $('#page1__info_list').empty();

  if (main.cday_list)
  {
    len = main.cday_list.length;
    for(var j = 0; j < len; j++)
    {
      jj = j + 1;
      u = main.cday_list[j];

      time = int2str(u[0][0]) + ":" + int2str(u[0][1]) + "-" + int2str(u[1][0]) + ":" + int2str(u[1][1]);
      ut = 'нет урока';

      if (u[2])
      {
        ut = u[2];
      }

      id = jj;
      uh =  "<div id='urok_line_n" + id + "' class='page1__info_list_item acr_panel_u'>";
      uh += "<div class='page1__info_list_item_time acr_panel_u_time right'>";
      uh += "" + jj + ": " + time;
      uh += "</div>";
      uh += "<div class='page1__info_list_item_text'>";
      uh += ut;
      uh += "</div>";
      uh += "</div>";
      $('#page1__info_list').append(uh);

    }
  }
}

function form_minute(cday, cdmin)
{
  if (main.cday_list)
  {
    tt = -1;
    jj = -1;
    len = main.cday_list.length;
    for(var j = 0; j < len; j++)
    {
      u = main.cday_list[j];
      if (u[2])
      {
        utb = u["tb"];
        ute = u["te"];

        if (cdmin < utb)
        { //before cur urok
          tt = 1; tto = utb - cdmin; jj = j + 1; break;
        }
        else
        {
          if (cdmin < ute)
          { // in cur urok
            tt = 2; tto = ute - cdmin; jj = j + 1; break;
          }
        }
      }
    }
    
    console.log(tt, tto, jj);

    if (tt != main.tt_p)
    {
      form_minute_change(tt, tto, jj);
    }
    form_minute_always(tt, tto, jj);

    main.tt_p = tt;




    
  }
}

function form_minute_change(tt, tto, jj)
{
  switch (tt)
  {
    case -1:
    {
      $('#page1__info_head_cur_info_text_line').text("уроки закончены");
      $('#page1__info_head_cur_info_minutes_do_text').text("");

      $("div[id^='urok_line_n']").data("urok-selected", null);
      //removeClass('acr-urv-ui-border-blue acr-urv-ui-border-green');

      // main.audio2.play();
      break;
    }

    case 1:
    {
      $('#page1__info_head_cur_info_text_line').text( "Перемена, до урока:" );

      $('#urok_line_n'+jj).data("urok-selected", "next")
      
      //addClass('acr-urv-ui-border-blue');




      $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-ttext').addClass("acr-urv-ui-color-blue");
      
      $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-utime').addClass("acr-urv-ui-color-blue");
      
      
      //if (tto == 3)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 2)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 1)
      //{
      //  main.audio1.play();
      //}
      //if (main.tt_p == 2)
      //{
      //  main.audio2.play();
      //}
      
      break;
    }
    
    case 2:
    {
      $('#page1__info_head_cur_info_text_line').text( "Урок, до конца:" );
      
      $("#urok_line_n"+jj).addClass("acr-urv-ui-border-green");
      $('#urok_line_n'+jj).data("urok-selected", "current")
      
      
      $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-ttext').addClass("acr-urv-ui-color-green");
      
      $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-utime').addClass("acr-urv-ui-color-green");
      
      
      //if (tto == 3)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 2)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 1)
      //{
      //  main.audio1.play();
      //}
      //if (main.tt_p == 1)
      //{
      //  main.audio2.play();
      //}
      
      
      break;
    }
    
  }
  
}

function form_minute_always(tt, tto, jj)
{
  switch (tt)
  {
    case -1:
    {
      break;
    }

    case 1:
    {
      $('#page1__info_head_cur_info_minutes_do_text').text( int2str(tto) );



      $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-ttext').addClass("acr-urv-ui-color-blue");
      
      $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-utime').addClass("acr-urv-ui-color-blue");
      
      
      //if (tto == 3)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 2)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 1)
      //{
      //  main.audio1.play();
      //}
      //if (main.tt_p == 2)
      //{
      //  main.audio2.play();
      //}
      
      break;
    }
    
    case 2:
    {

      $('#page1__info_head_cur_info_minutes_do_text').text( int2str(tto) );
      pd = 100 - (((tto / main.urok_len) * 100) | 0);
      $('#page1__info_head_cur_info_text').css('background', "linear-gradient(90deg, #05003F 0 " + pd + "%, #053F3F " + pd + "% 100%)") 
      
      
      

      
      $('#acr-urv-id-ttext').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-ttext').addClass("acr-urv-ui-color-green");
      
      $('#acr-urv-id-utime').removeClass("acr-urv-ui-color-green acr-urv-ui-color-blue");
      $('#acr-urv-id-utime').addClass("acr-urv-ui-color-green");
      
      
      //if (tto == 3)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 2)
      //{
      //  main.audio1.play();
      //}
      //if (tto == 1)
      //{
      //  main.audio1.play();
      //}
      //if (main.tt_p == 1)
      //{
      //  main.audio2.play();
      //}
      
      
      break;
    }
    
  }
  
}



