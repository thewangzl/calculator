
function calculate(weight,thiness,length){
    var density = 7.89;
    var width = 1.22;
    var count = weight*1000/(density * width  * thiness * length);
    count = Math.floor(count);
    return count;
}


module.exports ={
    calculate : calculate
}