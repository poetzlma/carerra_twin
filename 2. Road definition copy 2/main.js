const canvas=document.getElementById("myCanvas");
canvas.width=700;

const length = 100;

const ctx = canvas.getContext("2d");

//[track_piece_type,rotation,is_start]
var track_map = [
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[2,1,0],[1,1,0],[2,2,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[1,0,1],[0,0,0],[1,2,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[1,0,1],[0,0,0],[1,2,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[2,0,0],[1,3,0],[2,3,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
    ];

var track_mapLength = track_map.length;

// build track
var track_elements = [];
const size = 8;

var car_x_start = 0;
var car_y_start = 0;

for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {

        if (track_map[x][y][0] == 1){
            var segment = new Straight(2,length,y,x,track_map[x][y][1]);
            
            //cehck if start segmeent
            if(track_map[x][y][2]==1){
                car_x_start=segment.track_start_left_x;
                car_y_start=segment.track_start_left_y;
            }
            track_elements.push(segment)

        }
        if (track_map[x][y][0] == 2){
            var segment = new Corner(2,length,y,x,track_map[x][y][1]);
            track_elements.push(segment)
        }
        
    };
};

function check_track( track_pieces) {

    var connected_track_elements = [];

    var last_piece;

    //determine start element
    track_pieces.forEach(element => {        
        if (element.type == 1){
            connected_track_elements.push(element);
        }
    });
};

const car=new Car(car_x_start,car_y_start,30,50);

animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,400);   

    track_elements.forEach(piece => {
        piece.draw(ctx);
    });

    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
};