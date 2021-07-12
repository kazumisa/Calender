'use strict';

// 配列要素で曜日を作成
const week = ['日', '月', '火', '水', '木', '金', '土'];

// 今日の日付を取得
const today    = new Date();

// 今月の1日を取得
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

/* 先月を表示(onclickイベント) */
const prevMonth = function() {
  // 先月の整数値を取得しsetMonthの引数として渡す
  showDate.setMonth(showDate.getMonth() - 1);

  // カレンダーを表示
  showCalendaer(showDate);
}

/* 次月を表示(onclickイベント) */
const nextMonth = function() {
  // 次月の整数値を取得しsetMonthの引数として渡す
  showDate.setMonth(showDate.getMonth() + 1);

  // カレンダーを表示
  showCalendaer(showDate);
}

/* 年月を選択(onclick) */
const selectYearMonth = function() {
  // 選択した西暦を取得
  const selectedYear  = parseInt(document.querySelector('.year').value, 10);

  // 選択した月を取得
  const selectedMonth = parseInt(document.querySelector('.month').value, 10);

  // 選択した西暦の整数値をsetMonthの引数として渡す
  showDate.setFullYear(selectedYear);

  // 選択した月の整数値をsetMonthの引数として渡す
  showDate.setMonth(selectedMonth - 1);

  // カレンダー表示
  showCalendaer(showDate);
}

/* カレンダー表示処理 */
const showCalendaer = function(showDate) {
  // 当月の西暦を取得
  const year  = showDate.getFullYear();

  // 当月の月を取得(0 ~ 11)
  const month = showDate.getMonth();

  // yyyymmクラスを取得しinnerHTMLで年月を表示
  document.querySelector('.yyyymm').innerHTML = year + '年' + (month + 1) + '月';

  // カレンダー作成
  createCalender(year, month);

  // ドロップダウンリスト作成
  dropDownList(year, month);
}

/* カレンダー作成処理 */
const createCalender = function(year, month) {
  // containerクラスを取得
  const container = document.querySelector('.container');

  // カレンダーを初期化
  container.innerHTML = '';

  // table要素を作成
  const createdTable = document.createElement('table');

  // table要素にクラスを追加
  createdTable.classList.add('calender');

  // table要素をcontainerクラスに追加
  container.appendChild(createdTable);

  // containerクラスにtable要素を追加
  container.appendChild(createdTable);

  // tr要素を作成
  const rowOfWeek = document.createElement('tr');

  // tr要素にクラスを追加
  rowOfWeek.classList.add('rowOfWeek');

  // tr要素をtable要素に追加
  createdTable.appendChild(rowOfWeek);

  /* ループ処理し各曜日を取得 */
  for(let i = 0; i < week.length; i++) {
    // th要素を取得
    const thOfWeek = document.createElement('th');

    /* 日曜日 */
    if(i == 0) {
      // sundayクラスを追加
      thOfWeek.classList.add('sunday');
    
    /* 土曜日 */
    } else if(i == week.length - 1) {
      // saturdayクラスを追加
      thOfWeek.classList.add('saturday');
    }
    // th要素に曜日の値を追加
    thOfWeek.innerHTML = week[i];

    // th要素をtr要素に追加
    rowOfWeek.appendChild(thOfWeek);
  }

  // 日にちをカウント
  let dayCount = 0;

  // 当月1日の週の整数値を取得(0~6)
  const startDayOfWeek     = new Date(year, month, 1).getDay();

  // 当月最終日を整数値で取得
  const endDateOfMonth     = new Date(year, month + 1, 0).getDate();

  // 前月最終末日の日にちを取得
  const endDateOfLastMonth = new Date(year, month, 0).getDate();

  /* ループ処理し必要な週を取得 */
  for(let i = 0; i < 6; i++) {
    // tr要素を作成
    const trOfDate = document.createElement('tr');

    // tr要素をtable要素に追加
    createdTable.appendChild(trOfDate);

    /* ループ処理し日にちを取得 */
    for(let j = 0; j < week.length; j++) {
      // td要素を作成
      var tdOfDate = document.createElement('td');

      /* 第1週かつ月初めの曜日が日曜日でない時 */
      if(i == 0 && j < startDayOfWeek) {
        // disableクラスを付与
        tdOfDate.classList.add('disable');

        // td要素に前月末日の日にちを追加
        tdOfDate.innerHTML = endDateOfLastMonth - startDayOfWeek + j + 1;

      /* 日にちのカウントが今月最終日以上の時 */
      } else if(dayCount >= endDateOfMonth) {
        // 日にちをカウント
        dayCount++;

        // disableクラスを付与
        tdOfDate.classList.add('disable');

        // td要素に次月初日の日にちを追加
        tdOfDate.innerHTML = dayCount - endDateOfMonth;

        /* 日にち一列が全て次月の日にち際 */
        if(i == 5 && j == 0) {
          // 最後の週を削除
          document.querySelector('.calender > tr:last-child').remove();
        }
      } else {
        // 日にちをカウント
        dayCount++;

        /* 今日の日にちの時の処理 */
        if(year == today.getFullYear() && month == today.getMonth() && dayCount == today.getDate()) {
          // todayクラスを付与
          tdOfDate.classList.add('today');
        } 
        // td要素に日にちを追加
        tdOfDate.innerHTML = dayCount;
      }
      /* 日曜日 */
      if(j == 0) {
        // sundayクラスを追加
        tdOfDate.classList.add('sunday');

      /* 土曜日 */
      } else if(j == week.length - 1) {
        // saturdayクラスを追加
        tdOfDate.classList.add('saturday');
      }
      // td要素をtr要素に追加
      trOfDate.appendChild(tdOfDate);
    }
  }
}

/* 年月のドロップダウンリスト処理 */
const dropDownList = function(year, month) {
  // yearクラスを取得
  const selectedYear  = document.querySelector('.year');

  // monthクラスを取得
  const selectedMonth = document.querySelector('.month');

  // yearクラスの中身を初期化
  selectedYear.innerHTML  = '';

  // monthクラスの中身を初期化
  selectedMonth.innerHTML = '';

  // ドロップダウンリストで表示したい最大の西暦
  const maxYear = today.getFullYear() + 5;
  
  /* ループ処理し西暦を取得 */
  for(let i = 10; i > 0; i--) {
    // option要素を作成
    const option = document.createElement('option');

    // option要素に西暦を追加
    option.innerHTML = (maxYear - i) + '年';

    // 当年の際の処理
    if((maxYear - i) == year) {
      // selected属性を追加
      option.selected = true;
    }

    // option要素をselect要素に追加
    selectedYear.appendChild(option);
  }

  /*  ループ処理し12ヶ月分のoption要素を作成*/
  for(let i = 0; i < 12; i++) {
    // option要素を作成
    const option = document.createElement('option');

    // option要素に月名を追加
    option.innerHTML = (i + 1) + '月';

    /* 当月の際の処理 */
    if(i == month) {
      // selected属性を付与
      option.selected = true;
    }

    // option要素をselect要素に追加
    selectedMonth.appendChild(option);
  }
}



/* HTML要素が読み込まれた際の処理 */
window.onload = function() {
  // カレンダーを表示
  showCalendaer(showDate);
}