

// header 해야할 일
const alarmBtn = document.querySelector('.alarm > a');
const myinfoBtn = document.querySelector('.myinfo > a');

function toggleOnClass(e) {
    e.preventDefault();
    e.target.parentNode.classList.toggle('on');
}

// 다른영역 클릭시 on 클래스 제거
function removeOnClassOutsideClick(e) {
    const myinfoContainer = document.querySelector('.myinfo');

    if (!myinfoContainer.contains(e.target)) {
        myinfoContainer.classList.remove('on');
    }
}

alarmBtn.addEventListener('click', toggleOnClass);
myinfoBtn.addEventListener('click', toggleOnClass);
window.addEventListener('click', removeOnClassOutsideClick); // 다른영역 클릭시 on 클래스 제거

// span 요소의 클릭 이벤트 처리
const spans = document.querySelectorAll('.alarm a span, .myinfo a span');
spans.forEach(function(span) {
    span.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // 이벤트 버블링 차단
        const $li = e.currentTarget.parentNode.parentNode;
        $li.classList.toggle('on');
    });
});

// nav
const links = document.querySelectorAll('nav a');
const highlight = document.querySelector('.highlight');

// nac 배경색 따라다니는스크립트
function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    const navCoords = document.querySelector('nav').getBoundingClientRect();

    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top - navCoords.top,
        left: linkCoords.left - navCoords.left
    };

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    highlight.style.opacity = 1;
}

// 마우스 떠날때 opacity조절
function removeHighlight() {
    highlight.style.opacity = 0;
}

links.forEach(link => {
    link.addEventListener('mouseenter', highlightLink);
    link.addEventListener('mouseleave', removeHighlight);
});

// 화면 크기가 1630이하가 되면 alarmBtn의 class 제거
function removeOnClass() {
    const windowWidth = window.innerWidth;
  
    if (windowWidth <= 1630) {
        alarmBtn.parentNode.classList.remove('on');
    } else {
        alarmBtn.parentNode.classList.add('on');
    }
}
window.addEventListener('DOMContentLoaded', removeOnClass);
window.addEventListener('resize', removeOnClass);

// 데이트피커
(function () {
    Datepicker.locales.ko = {
      days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      daysShort: ["일", "월", "화", "수", "목", "금", "토"],
      daysMin: ["일", "월", "화", "수", "목", "금", "토"],
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      today: "오늘",
      clear: "삭제",
      format: "yyyy-mm-dd",
      titleFormat: "y년mm월",
      weekStart: 0
    };
}());
// 일 데이트피커
const elems = document.querySelectorAll('.date input');
for (let i = 0; i < elems.length; i++) {
    const datepicker_day = new Datepicker(elems[i], {
        autohide: true,
        language: 'ko',
    });
}
// 기간 데이트피커
const range_elems = document.querySelectorAll('.date_range');
for (let i = 0; i < range_elems.length; i++) {
    const rangepicker = new DateRangePicker(range_elems[i], {
        autohide: true,
        language: 'ko',
    }); 
}

// 탭버튼
const tabButtons = document.querySelectorAll('.tab_btn button');
const tabContents = document.querySelectorAll('.tab_content');

function openTab(e) {
    const tabId = e.target.dataset.tab;

    // 모든 탭 컨텐츠를 비활성화
    tabContents.forEach(function(tabContent) {
        tabContent.classList.remove('active');
    });

    // 모든 탭 버튼을 비활성화
    tabButtons.forEach(function(tabButton) {
        tabButton.classList.remove('active');
    });

    // 선택한 탭 컨텐츠를 활성화
    document.querySelector('.' + tabId).classList.add('active');

    // 선택한 탭 버튼을 활성화
    e.target.classList.add('active');
}

// 탭 버튼에 클릭 이벤트 리스너 추가
tabButtons.forEach(function(tabButton) {
    tabButton.addEventListener('click', openTab);
});

// 팝업
function openPopup(url, width, height) {
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const options = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
    window.open(url, '_blank', options);
}