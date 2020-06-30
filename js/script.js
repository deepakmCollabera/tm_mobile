$(document).ready(function () {
  var pPos = 89;
  var pEarned = 65;
  var addThisDefault = 270;
  var percNumb = ((pEarned / pPos) * 100).toFixed(3);
  var percCss = ((pEarned / pPos) * 180).toFixed(3);
  $(".percNum span").text(Math.round(percNumb) + "%");
  $(".needle").css("transform", "rotate(" + Math.round(parseInt(270) + parseInt(percCss)) + "deg)");


  // Load google charts
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Pending', 4],
      ['In Progress', 1],
      ['Completed', 3]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = { 'width': 133, 'height': 104, 'colors': ['#FF5D5D', '#F0BE17', '#3CD991'], 'chartArea': { left: 0, top: 0, width: 133, height: 100 }, 'pieStartAngle': 50, 'legend': { position: 'none' } };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);

    $("#navbarDropdownMenuLink").on("click", function () {
      $(this).siblings(".profile_menu").toggleClass("d-none");
    });
  }

  $('#progress_wrap_carousel').bind('slide.bs.carousel', function (e) {
    $(".progress_wrap").toggleClass("slided");
  });

  $('.profile_status_slide').on('click', function () {
    if ($(this).hasClass("hided")) {
      $(this).removeClass("hided");
      $('.progress_wrap').show();
      setTimeout(function () {
        $('#progress_wrap_carousel').carousel(0);
      }, 100)
    } else {
      if ($(".first_slide").hasClass("active")) {
        $('.progress_wrap').hide();
        $(this).addClass("hided");
        $(".assessment_completion_slide").addClass("hided");
      } else {
        setTimeout(function () {
          $('#progress_wrap_carousel').carousel(0);
        }, 100)
      }
    }
  })
  $('.assessment_completion_slide').on('click', function () {
    if ($(this).hasClass("hided")) {
      $(this).removeClass("hided");
      $('.progress_wrap').show();
      setTimeout(function () {
        $('#progress_wrap_carousel').carousel(1);
      }, 100)
    } else {
      if ($(".second_slide").hasClass("active")) {
        $('.progress_wrap').hide();
        $(this).addClass("hided");
        $(".profile_status_slide").addClass("hided");
      } else {
        setTimeout(function () {
          $('#progress_wrap_carousel').carousel(1);
        }, 100)
      }
    }
  })

  $(".contact_wrap").on("click", function () {
    $(".job_modal_view").show();
  })
  $(".close_job_modal").on("click", function () {
    $(".job_modal_view").hide();
  })
  $(".hamburger_menu").on("click", function () {
    $(".side_menu_bar").show();
    setTimeout(function () {
      $(".side_menu_bar_inner").addClass("active");
    }, 100)
  })
  $(".close_menu").on("click", function () {
    $(".side_menu_bar_inner").removeClass("active");
    setTimeout(function () {
      $(".side_menu_bar").hide();
    }, 500)
  })
  $(".info_popup").on("click", function () {
    if ($("#status_switch").prop("checked") == false) {
      $(this).siblings("#unchecked_msg").toggle();
    } else {
      $(this).siblings("#checked_msg").toggle();
    }
  })
  $(".close_popup").on("click", function () {
    $(this).parent(".send_msg").hide();
  })

  var pnumb1 = 6;
  var pnumb2 = 2;
  var pnumb3 = 4;
  var ptotal = pnumb1 + pnumb2 + pnumb3;
  var percCss1 = ((pnumb1 / ptotal) * 360).toFixed(3);
  var percCss2 = ((pnumb2 / ptotal) * 360).toFixed(3);
  var percCss3 = ((pnumb3 / ptotal) * 360).toFixed(3);

  var pie2 = parseInt(percCss1) + parseInt(percCss2)

  $("#pieSlice1 > .pie").css("transform", "rotate(" + percCss1 + "deg)");
  $("#pieSlice2").css("transform", "rotate(" + percCss1 + "deg)");
  $("#pieSlice2 > .pie").css("transform", "rotate(" + percCss2 + "deg)");
  $("#pieSlice3").css("transform", "rotate(" + pie2 + "deg)");
  $("#pieSlice3 > .pie").css("transform", "rotate(" + percCss3 + "deg)");

  // on scroll down hide top nav
    var distance = $('#second_nav').offset().top,
      $window = $(window);
    $window.scroll(function () {
      if (Number(window.pageYOffset)+30 > distance) {
        $(".myresume_nav, .top_navbar, .jobdetail_topbar, .assessment_nav").addClass("topslide");
        // $(".bottom_nav").addClass("bottom_slide");
        $('#second_nav').addClass("second_nav_stick");
        $('.tab_content_wrap').addClass("active");
      } else if ($window.scrollTop() < distance) {
        $(".myresume_nav, .top_navbar, .jobdetail_topbar, .assessment_nav").removeClass("topslide");
        // $(".bottom_nav").removeClass("bottom_slide");
        $('#second_nav').removeClass("second_nav_stick");
        $('.tab_content_wrap').removeClass("active");
      }
    });
  // on scroll down hide top nav

  var flag = 0;
  if (flag == 0) {
    $(" .resume_tab_list .sp_tab_head").each(function () {
      var thisID = $(this).attr("data-slide");
      $(this).attr("data-scrltop", $("#" + thisID).offset().top);
    });
    flag = 1;
  }
  $(" .resume_tab_list .sp_tab_head").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-slide");
    $(".tab_content_wrap").animate(
      {
        scrollTop: $(this).attr("data-scrltop")
      },
      1000
    );
    $(".resume_tab_list li").removeClass("active");
    $(".resume_tab_list .sp_tab_head[data-slide = " + id + "]").addClass(
      "active"
    );
  });
  // side nav on click scroll slowly

  // on scroll active current item
  $(".tab_content_wrap").on("scroll", function () {
    $(".tabs_content").each(function () {
      if ($(this).offset().top < 200) {
        var id = $(this).attr("id");
        $(".resume_tab_list li").removeClass("active");
        $(".resume_tab_list")
          .find("[data-slide='" + id + "']")
          .addClass("active");
      }
    });
  });

  $(".extra_one").on("click", function () {
    $(".extra_tooltip").not(this).removeClass("show");
    $(this).children(".extra_tooltip").addClass("show");
  })
  $(document).on("click", ".extra_tooltip_close", function () {
    $(this).parent().removeClass("show");
  })

  $(".info_wrap").on("click", function () {
    console.log("yes");
    // $(this).parent().siblings(".got_it_wrap", ".pay_info").toggle();
    console.log("yes1");
  })

  // selectlogo
  $(".selectlogo").on("click", function () {
    console.log("print")
    $(this).toggleClass("active");
  })
  // selectlogo
})

