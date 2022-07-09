class Straight{
    constructor(laneCount=2,length=100,grid_x,grid_y,rotation,type){
        this.x=grid_x*length;        
        this.laneCount=laneCount;

        var offset_left = 50;

        this.left = offset_left;
        this.right =length + offset_left;
        
        this.top=length;
        this.bottom=0;

        this.type = type;

        const bottomLeft=      {x:this.left+grid_x*length,     y:this.top+grid_y*length};
        const bottomRight=     {x:this.right+grid_x*length,    y:this.top+grid_y*length};
        const topLeft=   {x:this.left+grid_x*length,     y:this.bottom+grid_y*length};
        const topRight=  {x:this.right+grid_x*length,    y:this.bottom+grid_y*length};

        
        
        if (rotation == 0){
            this.borders=[
                [bottomRight,topRight],            
                [bottomLeft,topLeft]
            ];

            this.track_start_left_x = bottomLeft.x+(((bottomRight.x-bottomLeft.x)/3)*1);
            this.track_start_left_y = bottomLeft.y;

            this.track_end_left_x = topLeft.x+(((topRight.x-topLeft.x)/3)*1);
            this.track_end_left_y = topLeft.y
        }
        if (rotation == 1){
            this.borders=[
                [topLeft,topRight],            
                [bottomLeft,bottomRight]
            ];

            this.track_start_left_x = bottomLeft.x;
            this.track_start_left_y = topLeft.y-(((topLeft.y-bottomLeft.y)/3)*1);

            this.track_end_left_x = bottomRight.x;
            this.track_end_left_y = topLeft.y-(((topLeft.y-bottomLeft.y)/3)*1);
        }
        if (rotation == 2){
            this.borders=[
                [bottomRight,topRight],            
                [bottomLeft,topLeft]
            ];

            this.track_start_left_x = topRight.x-(((topRight.x-topLeft.x)/3)*1);
            this.track_start_left_y = topRight.y;

            this.track_end_left_x = bottomRight.x-(((bottomRight.x-bottomLeft.x)/3)*1);
            this.track_end_left_y = bottomRight.y;
        }
        if (rotation == 3){
            this.borders=[
                [topLeft,topRight],            
                [bottomLeft,bottomRight]
            ];

            this.track_start_left_x = bottomRight.x;
            this.track_start_left_y= topLeft.y-(((topLeft.y-bottomLeft.y)/3)*2);

            this.track_end_left_x = bottomLeft.x;
            this.track_end_left_y = topLeft.y-(((topLeft.y-bottomLeft.y)/3)*2);

        }
    }


    draw = async(ctx) => {
        
        ctx = await this.draw_borders(ctx);      

    }

    draw_borders(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            
            ctx.stroke();           

            ctx.beginPath();
            ctx.strokeStyle="white";
            ctx.moveTo(this.track_start_left_x,this.track_start_left_y);
            ctx.lineTo(this.track_end_left_x,this.track_end_left_y);            
            ctx.stroke();

        });

        return ctx;
    }
}