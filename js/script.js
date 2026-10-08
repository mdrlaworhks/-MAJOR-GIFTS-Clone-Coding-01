$(function () {
  var $header = $("#header");

  // 헤더에 마우스 올리면 열기, 벗어나면 닫기
  $header.on("mouseenter", function () {
    $header.addClass("on");
  });
  $header.on("mouseleave", function () {
    $header.removeClass("on");
  });

  // 키보드(Tab)로 메뉴에 들어와도 열리게
  $header.on("focusin", function () {
    $header.addClass("on");
  });
  $header.on("focusout", function () {
    $header.removeClass("on");
  });

  // 버튼 클릭으로 열고 닫기 (터치 기기 대비)
  $(".btn-menu").on("click", function () {
    $header.toggleClass("on");
  });

  // 아래 화살표 클릭 → 다음 섹션으로 부드럽게 스크롤
  $(".scroll-down").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: $(".visual").outerHeight() }, 600);
  });

  // 스크롤 방향에 따라 헤더 숨김/표시
  var lastScroll = 0;

  $(window).on("scroll", function () {
    var st = $(this).scrollTop(); // 지금 스크롤 위치

    // 맨 위가 아니면 반투명 흰 배경
    if (st > 0) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }

    // 이전 위치보다 커졌으면 = 아래로 내리는 중 → 숨김
    if (st > lastScroll && st > 98) {
      $header.addClass("hide").removeClass("on");
    } else {
      $header.removeClass("hide");
    }

    lastScroll = st; // 다음 비교를 위해 저장
  });

  // ===== 카운터 =====
  let counted = false; // 카운트를 이미 했는지
  let countTimer; // 카운트 시작 대기 타이머

  // 숫자 0 → 목표값까지 올리기
  function countUp() {
    $(".num").each(function () {
      let $this = $(this);
      let target = $this.data("num");
      let obj = { n: 0 };
      $this.data("anim", obj); // 나중에 멈출 수 있게 저장

      $(obj).animate(
        { n: target },
        {
          duration: 2000,
          step: function (now) {
            $this.text(Math.floor(now));
          },
          complete: function () {
            $this.text(target);
          },
        },
      );
    });
  }

  // 카운트 멈추고 0으로 되돌리기
  function countReset() {
    clearTimeout(countTimer);
    $(".num").each(function () {
      let obj = $(this).data("anim");
      if (obj) $(obj).stop();
      $(this).text(0);
    });
  }

  // ===== 스크롤 등장 효과 =====
  $(window).on("scroll", function () {
    let sc = $(window).scrollTop();
    let winH = $(window).height();

    // con01
    let con01Top = $("#con01").offset().top;
    if (sc + winH > con01Top + 200) {
      $("#con01").addClass("show");
    } else {
      $("#con01").removeClass("show");
    }

    // con02
    // con02 카운터 (등장 효과는 .fade가 처리)
    let counterTop = $(".counter").offset().top;
    if (sc + winH > counterTop + 100) {
      if (!counted) {
        counted = true;
        countTimer = setTimeout(countUp, 800); // counter가 다 올라온 뒤 시작
      }
    } else {
      counted = false;
      countReset();
    }

    // con03 (fade 요소: 하나씩 따로 검사)
    $(".fade").each(function () {
      let fadeTop = $(this).offset().top;
      if (sc + winH > fadeTop + 100) {
        $(this).addClass("show");
      } else {
        $(this).removeClass("show"); // 위로 올려서 화면 아래로 사라지면 초기화
      }
    });
  }); // ← scroll 함수 끝. fade 코드는 이 안에 있어야 함
  // ===== con05 탭 =====
  $(".tab li").on("click", function () {
    let i = $(this).index();

    // 탭 글자 색
    $(".tab li").removeClass("active");
    $(this).addClass("active");

    // 같은 순서의 카드 목록으로 바로 교체
    $(".panel").removeClass("active");
    $(".panel").eq(i).addClass("active").find("li").addClass("show");
  });
  $(window).trigger("scroll");
});
