var Max_Flags = 21;
var flags = 21;
var max = 3;
var min = 1;
var display_Good = false;
var Number_Text = ["Zero","One", "Two","Three","Four","Five","Six", "Seven", "Eight", "Nine", "Ten"]
/* create local width and height values */
var w = window.innerWidth
var h = window.innerHeight
var player_turn = true;

function Size_Canvas() {
    console.log("Resizing canvas")
    /* Change local With and height variables */
    w = window.innerWidth
    h = window.innerHeight
    /* Change canvas With and height variables */
    canvas.width = w
    canvas.height = h
};

var canvas;

window.addEventListener('load', function (e) {
    document.getElementById("number").innerHTML = flags;
    canvas = document.getElementById("MyCanvas");
    Size_Canvas()
    window.requestAnimationFrame(step);
})

window.onresize = Size_Canvas;

function User_Move(int) {
    /* Check if move is valid */
    if (int >= min && int <= max && flags - int >= 0 && player_turn) {
        /* Make move */
        flags -= int;
        /* Update screen */
        document.getElementById("number").innerHTML = innerHTML = flags;
        /* Check if the game is dome */
        Check_If_Done()

        /* Toggle players turn */
        player_turn = false;
        if (flags > 0)
            setTimeout(CPU_Move, Math.random() * 3000);
    }
}
function Check_If_Done() {
    /* See if no flags left */
    if (flags == 0) {
        var msg = ""
        if (player_turn) {
            msg += "Player won!!!"
        } else {
            msg += "CPU won!!!"
        }
        document.getElementById("Curent").style.display = "none"

        document.getElementById("msg").style.display = ""
        document.getElementById("msg").innerHTML = msg
    }
}

function CPU_Move() {
    if (!player_turn) {
        /* See what the best move would be to make */
        var cpu = ideal()
        /* if the move is valid make it */
        if (cpu >= min && cpu <= max) {
            flags -= cpu;
        }
        /* Else make random valid move */
        else {
            ran = min + Math.floor((Math.random() * (max - min + 1)));
            flags -= ran;
        }
        /* Update the screen */
        document.getElementById("number").innerHTML = flags;
        /* Check if the game is dome */
        Check_If_Done()
        /* Toggle players turn */
        player_turn = true;
    }
}

function step(now) {
    /* requests a new frame  */
    window.requestAnimationFrame(step);
    /* Creates a canvas that can be used to draw */
    var Spacing = w / Max_Flags
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    var Width = w / Max_Flags / 2
    for (i = 0; i < flags; i++) {
        if (Good_Move(i) && display_Good) {
            ctx.fillStyle = "#F00";
        }
        else {
            ctx.fillStyle = "#000";
        }
        var x = (i / Max_Flags * w) - (Width/2) + Spacing / 2;
        ctx.fillRect(x, 200, Width, 100);
    }
}

function restart() {

    document.getElementById("Curent").style.display = ""
    document.getElementById("msg").style.display = "none";;
    document.getElementById("msg").innerHTML = "";
    flags = Max_Flags;
    document.getElementById("number").innerHTML = flags;
    player_turn = true;
}

function Toggal_Help() {
    display_Good = !display_Good;
}

function Good_Move(Flags) {
    return (Flags % (max + min) == 0)
}

function ideal() {
    return flags % (max + min)
}