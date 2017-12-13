const uri = 'https://api.mapbox.com/matching/v5/mapbox/driving/';
const token = '?access_token=pk.eyJ1IjoiZ2FlbGx5IiwiYSI6ImNqYTBkY2U0MzFxd2UycXFyY255ZWEwbXUifQ.m0RfhOmFQTNa7nxIIiWrOA';
var request = require('request');
// bus stop 36.363898, 127.345258
const default_latitude  = 36.363898;
const default_longtitude = 127.345258;

    

const  calDistance = function(lat1 , lon1 , lat2 , lon2)
{
    
    theta = lon1 -lon2 ;
     dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))   
          * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));  
    dist = Math.acos(dist);  
    dist = rad2deg(dist);  
    
    dist = dist * 60 * 1.1515;   
    dist = dist * 1.609344;    // 단위 mile 에서 km 변환.  
    dist = dist * 1000.0;      // 단위  km 에서 m 로 변환  
    
    return dist;
}


const deg2rad = function(deg){  
    return (deg * Math.PI / 180);  
}  
  
const rad2deg = function(rad){  
    return (rad * 180 / Math.PI);  
} 


const lines_A_name = ['정심화국제문화회관','경상대학앞','도서관 앞(농대방향)','학생생활관3거리','농업생명과학대학 앞','동문주차장','농업생명과학대학 앞_','도서관앞(도서관 삼거리 방향)','예술대학앞','음악2호관앞','공동동물실험센터 입구(회차)','체육관 입구','서문(공동실험실습관앞)','사회과학대학 입구(한누리회관뒤)','산학연교육연구관앞','정심화국제문화회관_'];
// 동문주차장 임의 설정 { default_latitude , default_longtitude }

const lines_B_name = ['정심화국제문화회관','경상대학앞','도서관 앞(농대방향)','학생생활관3거리','농업생명과학대학 앞','동문주차장','농업생명과학대학 앞_','도서관앞(도서관 삼거리 방향)','예술대학앞','음악2호관앞','공동동물실험센터 입구(회차)','체육관 입구','서문(공동실험실습관앞)','사회과학대학 입구(한누리회관뒤)','산학연교육연구관앞','정심화국제문화회관_'];

const lines_C_name = [];
const lines_D_name = [];

const lines_A_location = [{lati:default_latitude,longti:default_longtitude},{lati:36.367273,longti: 127.345613},{lati:36.369489,longti: 127.346544}, {lati:36.372412,longti: 127.346397},{lati:36.369176, longti:127.351762}, {lati:36.367296, longti:127.352098}, {lati:36.369176, longti:127.351762},{lati:36.369361,longti: 127.345966}, {lati:36.370497,longti: 127.343777}, {lati:36.374186,longti: 127.343884},{lati:36.376352 ,longti: 127.344298},{lati:36.371902,longti: 127.343010}, {lati:36.369354,longti: 127.341245},{lati:36.367116,longti: 127.342447},{lati:36.365794,longti: 127.345303},{lati:default_latitude,longti: default_longtitude}];





var testInterval = setInterval(function(){
/*
로직 구현 
위도랑 경도로 거리찾기 
*/
    
    
// 된것만 request
    console.log(Bus_A.getLocation());  
    
    let check_arr = [];
    let l_info= '';
    // 각 버스 별로 체크 검사
        //A
        if(Bus_A.checkbit)
            {
                Bus_A.checkbit = 0 ;
                check_arr.push('A');
                l_info = l_info+Bus_A.getLocation();
            }
        //B
        if(Bus_B.checkbit)
            {
                Bus_B.checkbit = 0 ;
                check_arr.push('B');
                if(check_arr.length>1) // 앞에 무조건 있다 
                {
                    l_info = l_info+';'+Bus_B.getLocation();
                }
                else
                    {
                        l_info = l_info+Bus_B.getLocation();
                    }
                
            }
        //C
    if(Bus_C.checkbit)
            {
                Bus_C.checkbit = 0 ;
                check_arr.push('C');
                if(check_arr.length>1) // 앞에 무조건 있다 
                {
                    l_info = l_info+';'+Bus_C.getLocation();
                }
                else
                    {
                        l_info = l_info+Bus_C.getLocation();
                    }
                
            }
        //D
    if(Bus_D.checkbit)
            {
                Bus_D.checkbit = 0 ;
                check_arr.push('D');
                if(check_arr.length>1) // 앞에 무조건 있다 
                {
                    l_info = l_info+';'+Bus_D.getLocation();
                }
                else
                    {
                        l_info = l_info+Bus_D.getLocation();
                    }
                
            }        
    // API 송신
//    console.log(uri+l_info+token);
    if(check_arr.length >0)
    {
        console.log(uri+l_info+token);
       request(uri+l_info+token, 
      function (error, response) {
           let ret = JSON.parse(response.body);
           console.log(ret['code']);
    if (ret['code'] =='Ok' && response.statusCode == 200) {
        
        
        
        
        for(let i =  1; i <= check_arr.length; i++)
        {
                   console.log("for 확인");
                
            //API 수신 값으로 바꿔줘야지 
                switch(check_arr[i-1])
                    {
            case 'A' : 
                        console.log(ret);
            Bus_A.setLocation_(ret.tracepoints[i*2-1].location[1],ret.tracepoints[i*2-1].location[0]);
                Bus_A.update_stop();
                console.log("실행확인");
                break;
            case 'B':

                Bus_B.setLocation_(ret.tracepoints[i*2-1].location[1],ret.tracepoints[i*2-1].location[0]);
                        Bus_B.update_stop();
                break;
                
            case 'C':

                Bus_C.setLocation_(ret.tracepoints[i*2-1].location[1],ret.tracepoints[i*2-1].location[0]);
                        Bus_C.update_stop();
                break;
            case 'D':

                Bus_D.setLocation_(ret.tracepoints[i*2-1].location[1],ret.tracepoints[i*2-1].location[0]);
                        Bus_D.update_stop();
                break;        
            }
            
        }
        console.log("성공");
        /*console.log("body>>>>>>>>>>" , ret.tracepoints[1].location[1]);
        console.log("body>>>>>>>>>>" , ret.tracepoints[1].location[0]);*/
        
        
        
        
    } else {
        console.log("실패");                
        console.log(response.body);                
        
        // 문찬용장학금만들자 
    }
    }); 
    
    }
    // 수신 후 변경 

},1000);



module.exports = function(app)
{
    
    
   
    function Bus (line) {
    this.line = line;
    this.status = 'wait';
    this.previousLongtitude = default_longtitude;
    this.previousLatitude =default_latitude;
    this.longitude = default_longtitude;
    this.latitude = default_latitude;
    this.fromStop = 0;
    this.toStop = 1;    
    this.checkbit = 0; 
    //this.color = "red";
                        };
 
    Bus_A = new Bus('A');
    Bus_B = new Bus('B');
    Bus_C = new Bus('C');
    Bus_D = new Bus('D');

    Bus.prototype.getStops = function(select) {
        
        switch(select)
        {
            case 'A':
                return { line : lines_A_name};                
            case 'B':
                 return { line : lines_B_name};                
            case 'C':
                return {};
            case 'D':
                  return {line : lines_D_name};



        }
    };

Bus.prototype.getInfo = function() {
    result = {};
    result["fromStop"]= this.fromStop;
    result["toStop"]= this.toStop;    
    return result ;
};
  Bus.prototype.setInfo = function(from,to) {
    this.fromStop = from;
    this.toStop = to;
};  
    Bus.prototype.setStatus = function(status) {
    this.status = status;
};
      Bus.prototype.setLocation = function(lati,longti) {
                 
          this.previousLatitude =this.latitude;
          this.previousLongtitude =this.longitude ;
          this.latitude = lati;
          this.longitude = longti;
};      
          Bus.prototype.setLocation_ = function(lati,longti) {
                           
          this.latitude = lati;
          this.longitude = longti;
};      
    
    Bus.prototype.update_stop = function() {
       // 도착판별 
       dist = calDistance(this.latitude,this.longitude,lines_A_location[this.toStop].lati,lines_A_location[this.toStop].longti)
        console.log("거리 :" + dist);
            if(dist <= 15 )
            {            
                
            this.toStop +=1;
            this.fromStop +=1;
                
            if(lines_A_name.length <= this.toStop) // 범위 넘어감 마지막이초기화 
                {                        
                    
                    this.toStop= 0;
                }
            }
            
            
        
        
        
};      
          Bus.prototype.getLocation = function() {          
            return (this.previousLongtitude+','+this.previousLatitude+';'+this.longitude+','+this.latitude);
          
};  
        Bus.prototype.setCheck = function(bit) {
          this.checkbit = bit;
          
};  
    
    
    // 현재 위치에서 거리계산후 도착인지 아닌지 판별 
    Bus.prototype.getTest= function() {
          
        result = {};
        result["lati"]=this.latitude;
        result["longti"]=this.longitude;    
        console.log(result);
        return result ;
            
        
          
};  
    
    

app.get('/bus/map/', function(req,res){                      
    res.status(200).render('./map.html');    
});    
    
app.get('/bus/testGps/:line_id', function(req,res){                      
      res.status(200).json(Bus_A.getTest());
      
  });    



    app.get('/bus/getGps/:line_id', function(req,res){
      
        
        switch(req.params.line_id)
        {
            case 'A' :
            res.status(200).send(Bus_A.getLocation());                            
                break;
            case 'B':
            res.status(200).send(Bus_B.getLocation());                            
                break;
            case 'C':
            res.status(200).send(Bus_C.getLocation());                            
                break;
            case 'D':
            res.status(200).send(Bus_D.getLocation());                            
                break;        
        }
        
        
    });    
    
    
    // 위치 설정 
    app.get('/bus/setGps/:line_id/:lati/:longti', function(req,res){
      
        
        switch(req.params.line_id)
        {
            case 'A' :
                Bus_A.setLocation(req.params.lati,req.params.longti);
                Bus_A.setCheck(1);
                break;
            case 'B':
                Bus_B.setLocation(req.params.lati,req.params.longti);
                Bus_B.setCheck(1);
                break;
            case 'C':
                Bus_C.setLocation(req.params.lati,req.params.longti);
                Bus_C.setCheck(1);
                break;
            case 'D':
                Bus_D.setLocation(req.params.lati,req.params.longti);
                Bus_D.setCheck(1);
                break;        
        }
        
        res.status(200).send('updatesuccess');
        
    });    
 
    
    
    
    
    // bus start
    // fromstop to stop 설정해야함 
    app.get('/bus/start/:line_id', function(req,res){
      
        
        switch(req.params.line_id)
        {
            case 'A' :
                Bus_A.setStatus('driving');
                break;
            case 'B':
                Bus_B.setStatus('driving');
                break;
            case 'C':
                Bus_C.setStatus('driving');
                break;
            case 'D':
                Bus_D.setStatus('driving');
                break;        
        }
        console.log('start');
        res.status(200).send('startsuccess');
        
    });

    //bus end
        app.get('/bus/wait/:line_id', function(req,res){
    
        console.log("end");
        switch(req.params.line_id)
        {
            case 'A' :
                Bus_A.setStatus('wait');
                Bus_A.setInfo(0,1);
                Bus_A.setLocation(default_latitude,default_longtitude);
                break;
            case 'B':
                Bus_B.setStatus('wait');
                Bus_B.setInfo(0,1);
                Bus_B.setLocation(default_latitude,default_longtitude);
                break;
                
            case 'C':
                Bus_C.setStatus('wait');
                Bus_C.setInfo(0,1);
                Bus_C.setLocation(default_latitude,default_longtitude);
                break;
            case 'D':
                Bus_D.setStatus('wait');
                Bus_D.setInfo(0,1);
                Bus_D.setLocation(default_latitude,default_longtitude);
                break;        
        }        
        res.status(200).send('waitsuccess');
        });
    
    
    
    //user get bus
        app.get('/user/getStop/:line_id', function(req,res){
      
        
        switch(req.params.line_id)
        {
            case 'A' :
                res.status(200).json(Bus_A.getInfo());
                break;
            case 'B':
                res.status(200).json(Bus_B.getInfo());
                break;
            case 'C':
                res.status(200).json(Bus_C.getInfo());
                break;
            case 'D':
                res.status(200).json(Bus_D.getInfo());
                break;        
        }
        
        //res.status(200).send('startsuccess');
        
    });
    app.get('/user/getStops/:line_id', function(req,res){
        
          
          switch(req.params.line_id)
          {
              case 'A' :
                  res.status(200).json(Bus_A.getStops('A'));
                  break;
              case 'B':
                  res.status(200).json(Bus_B.getStops('B'));
                  break;
              case 'C':
                  res.status(200).json(Bus_C.getStops('C'));
                  break;
              case 'D':
                  res.status(200).json(Bus_D.getStops('D'));
                  break;        
          }
          
          //res.status(200).send('startsuccess');
          
      });
    
    
    
    
    //////////////////////////////////////////////
  
     
}