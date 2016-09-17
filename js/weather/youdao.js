function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '',
    currentAuthor = '';
var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=';

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url,
        success: function(response) {
            var r = JSON.parse(response);
            currentQuote = r.quote;
            currentAuthor = r.author;
            $(".quote-text").animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#text').text(r.quote);
                });

            $(".quote-author").animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#author').html(r.author);
                });

            var color = Math.floor(Math.random() * colors.length);
            var cls = Math.floor(Math.random() * colors.length);
            $(".quote-text").animate({
                backgroundColor: colors[color],
                color: colors[color]
            }, 700);
            // $(".button").animate({
            //     backgroundColor: colors[color]
            // }, 700);
            $(".quote-author").animate({
                backgroundColor: colors[cls],

            }, 700);
        }
    });
}


$(document).ready(function() {
    getQuote();
    
    $('#new-quote').on('click', getQuote);
    $('#baidu-quote').on('click', function() {
        if (!inIframe()) {
            openURL('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
});


$(document).ready(function() {

        function getWeather() {
            $.ajax({
                dataType: "jsonp",
                url: 'http://api.jirengu.com/weather.php',
                success: function(data) {
                    //var a = data.date.split("-");
                    function getData(index, day) {
                        //console.log(data.results[0].currentCity)
                        //console.log(data.results[0].pm25)
                        var a = data.results[0].weather_data[index];
                        ctday = data.results[0].weather_data[0].date;
                        $("#current .weather-day").html(ctday);
                        //console.log(ctday);
                        var currentdate = a.date.split(" "),
                            temperature = a.temperature,
                            weather = a.weather,
                            wind = a.wind,
                            nurl = a.dayPictureUrl;
                        var getDay = $("." + day + " p");
                        var getPic = $("img");

                        getPic.attr("src", nurl);
                        getDay.eq(0).html(currentdate[0]);
                        getDay.eq(1).html(currentdate[1]);
                        getDay.eq(2).html(temperature);
                        getDay.eq(3).html(weather);
                        getDay.eq(4).html(wind);
                    }
                    getData(0, "today");
                    getData(1, "next-one");
                    getData(2, "next-two");
                    getData(3, "next-three");

                    $("#current p").eq(0).html("位置:"+data.results[0].currentCity+"");
                    $("#current p").eq(1).html("PM指数："+data.results[0].pm25+"");
                    
                }
            })
        }


        function changeDay() {
            var arr = $(".today .other").html().split("");
            var arr1 = [];
            arr1.push(arr[3], arr[4]);
            var num = parseInt(arr1.join(""), 10);
            var month = $(".today .other").html().split("月")[0];
            var num1 = num + 1,
                num2 = num + 2,
                num3 = num + 3;
            if (num1 >= 10) num1 = num1;
            else num1 = "0" + num1 + "";
            if (num2 >= 10) num2 = num2;
            else num2 = "0" + num2 + "";
            if (num3 >= 10) num3 = num3;
            else num3 = "0" + num3 + "";

            $(".next-one .other").html(month + "月" + (num1) + "日");
            $(".next-two .other").html(month + "月" + (num2) + "日");
            $(".next-three .other").html(month + "月" + (num3) + "日");
            $("#current p").eq(0).css("color","#CC0033");
            $("#current p").eq(1).css("color","#CC00CC");
            $("#current p").eq(2).css("color","#CC0099");
            $("#current p").eq(3).css("color","#CC3366");
            $("#current p").eq(4).css("color","#CC0000");
        }

        function GetTime() {
            var mon, day, now, hour, min, ampm, time, str, tz, end, beg, sec;
            mon = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月",
                "九月", "十月", "十一月", "十二月");
            day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
            now = new Date();
            hour = now.getHours();
            min = now.getMinutes();
            sec = now.getSeconds();
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            $("#time").html(
                "<nobr>"  + hour + ":" + min + ":" + sec + "</nobr>");
        }
        getWeather();
        changeDay();
        $(function() {
            setInterval(GetTime, 1000);
        });


    })
