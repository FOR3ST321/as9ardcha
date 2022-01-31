function shuffle(arr) {
    return arr
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

function setPrizeList() {
    $("#25k").html(data.prizeList[0]);
    $("#50k").html(data.prizeList[1]);
    $("#75k").html(data.prizeList[2]);
    $("#100k").html(data.prizeList[3]);
}

function setHistory() {
    $("#history-txt").html("");
    if (data.history.length === 0) {
        $("#history-txt").html("No History!");
    } else {
        data.history.forEach((e) => {
            $("#history-txt").append(`[${e.nominal}] No ${e.winner.id} <br />`);
        });
    }
}

function initialize() {
    for (let i = 0; i < data.prizeList.length; i++) {
        e = data.prizeList[i];
        for (let a = 0; a < e; a++) {
            data.prize.push(data.prizename[i]);
            data.prizeLeft++;
        }
    }

    data.prize = shuffle(data.prize);
    // console.log(data.prize);

    //simpen ke info prize
    setPrizeList();

    //simpen history
    setHistory();
}
window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}

$(document).ready(function () {
    initialize();

    function animateResult(nominal) {
        //ganti warna kalau 100k
        console.log(nominal);
        if(nominal === '100K'){
            $('#result-prize').css({color: '#f1f1b8',fontSize:'60px'})
        }
        else{
            $('#result-prize').css({color: 'white'})
        }


        $("#history").hide();
        $("#result-prize").hide();
        $("#prize-left").hide();
        $("#result-name").hide();
        $("#result")
            .show()
            .css({ opacity: 0.3 })
            .animate({ opacity: 1 }, 500, function () {
                setTimeout(function () {
                    $("#result-prize").show().css({ opacity: 0 , fontSize:'75px' });
                    $("#result-name").show().css({ opacity: 0 , fontSize:'65px' });
                    $("#result-prize").animate(
                        { opacity: 1 , fontSize:'35px'},
                        300,
                        function () {
                            setTimeout(function () {
                                $("#result-name").animate({ opacity: 1 , fontSize:'50px' }, 300);
                            }, 1500);
                        }
                    );
                }, 1000);
            });
    }

    $("#result").hide();
    $("#result").click(function () {
        $("#history").show();
        $("#btn").show();
        $("#prize-left").show();
        $(this).hide();
        console.log(data.prizeLeft);
        if(data.prizeLeft === 0){
            $("#btn").hide();
        }
    });

    $("#btn").click(function () {
        data.lottery = shuffle(data.lottery);
        data.prize = shuffle(data.prize);
        //pop
        let nominal = data.prize.pop();
        let winner = data.lottery.pop();
        data.prizeLeft--;
        console.log(winner);
        console.log(nominal);
        console.log(data.lottery);

        data.history.push({
            winner: winner,
            nominal: nominal,
        });

        //assign data
        $("#result-prize").html(`[${nominal}]`);
        $("#result-name").html(`${winner.id} - ${winner.name}`);
        switch (nominal) {
            case "25K":
                data.prizeList[0]--;
                break;
            case "50K":
                data.prizeList[1]--;
                break;
            case "75K":
                data.prizeList[2]--;
                break;
            case "100K":
                data.prizeList[3]--;
                break;
        }
        setHistory();
        setPrizeList();

        $(this).hide();
        animateResult(nominal);
    });
});
