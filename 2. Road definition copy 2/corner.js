class Corner{
    constructor(laneCount=2,length=100,grid_x,grid_y,rotation){
        this.x=grid_x*length;        
        this.laneCount=laneCount;

        var offset_left = 50;

        this.left = offset_left;
        this.right =length + offset_left;
        
        this.top=length;
        this.bottom=0;

        const bottomLeft=      {x:this.left+grid_x*length,     y:this.top+grid_y*length};
        const bottomRight=     {x:this.right+grid_x*length,    y:this.top+grid_y*length};
        const topLeft=   {x:this.left+grid_x*length,     y:this.bottom+grid_y*length};
        const topRight=  {x:this.right+grid_x*length,    y:this.bottom+grid_y*length};

        this.radius = ((bottomRight.x-bottomLeft.x)/3)*2;        
        
        if (rotation == 0){
            this.borders=[
                [bottomRight,bottomLeft],            
                [bottomLeft,topLeft]
            ];

            this.track_start_left_x = bottomRight.x;
            this.track_start_left_y = bottomRight.y+(((topLeft.y-bottomLeft.y)/3)*1);

            this.track_end_left_x = topLeft.x+(((topRight.x-topLeft.x)/3)*1);
            this.track_end_left_y = topLeft.y

            this.anker= topRight;
            this.curve_pi = 0.5;
        }
        if (rotation == 1){
            this.borders=[
                [bottomLeft,topLeft],            
                [topLeft,topRight]
            ];

            this.track_start_left_x = bottomLeft.x+(((bottomRight.x-bottomLeft.x)/3)*1);
            this.track_start_left_y = bottomLeft.y;

            this.track_end_left_x = topRight.x;
            this.track_end_left_y = topLeft.y-(((topLeft.y-bottomLeft.y)/3)*1);

            
            this.anker= bottomRight;
            this.curve_pi = 1;

            
        }
        if (rotation == 2){
            this.borders=[
                [topRight,bottomRight],            
                [topLeft,topRight]
            ];

            this.track_start_left_x = topLeft.x;
            this.track_start_left_y = topRight.y-(((topRight.y-bottomRight.y)/3)*1);

            this.track_end_left_x = bottomLeft.x+(((topRight.x-topLeft.x)/3)*2);
            this.track_end_left_y = bottomLeft.y

            this.anker= bottomLeft;
            this.curve_pi = 1.5;
        }
        if (rotation == 3){
            this.borders=[
                [topRight,bottomRight],            
                [bottomRight,bottomLeft]
            ];

            this.track_start_left_x = bottomLeft.x+(((bottomRight.x-bottomLeft.x)/3)*2);
            this.track_start_left_y = topRight.y;

            this.track_end_left_x = bottomLeft.x;
            this.track_end_left_y = topLeft.y-(((topLeft.y-bottomLeft.y)/3)*2);

            this.anker= topLeft;
            this.curve_pi = 0;
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
            ctx.arc(this.anker.x,this.anker.y, this.radius, this.curve_pi*Math.PI, this.curve_pi*Math.PI+0.5*Math.PI);
            ctx.stroke();

        });

        return ctx;
    }
}