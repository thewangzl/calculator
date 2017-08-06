
function calculate(metaData,cutData){
  var density = metaData.density;
  var width = metaData.width;
  var thickness = metaData.thickness;
  var weight = metaData.weight;
  var totalLength = calLength(density, width, thickness, weight);
  totalLength = parseInt(totalLength);
  var typeCount = 0;
  for (var data in cutData){
    typeCount++;
  }
  typeCount = typeCount / 2
  var i;
  var needLength = 0;
  var needCalQuantity = 0;
  for(i = 1; i <= typeCount;i++){
    var length = cutData["length_" + i];
    var quantity = cutData["quantity_" + i];
    if(!length || length == ''){
      continue;
    }
    if(quantity && quantity != ''){
      needLength += length * quantity;
    }else {
      needCalQuantity = i;
    }
  }
  var remainerLength = totalLength - needLength;
  if (remainerLength > 0) {
    if (needCalQuantity > 0){
      var quantity = remainerLength / cutData["length_" + needCalQuantity];
      return {
        calType : "calQuantity",
        index: needCalQuantity,
        quantity: parseInt(quantity)
      }
    }else {
      var remainerWeight = calWeight(density, width, thickness,remainerLength);
      return {
        calType : "calWeight",
        remainer: parseInt(remainerWeight),
        dataType: "positive"
      }
    }
  }else {
    var remainerWeight = calWeight(density, width, thickness, Math.abs(remainerLength));
    return {
      calType: "calWeight",
      remainer: parseInt(remainerWeight),
      dataType: "negative"
    }
  }

}

function calLength(density, width, thickness, weight){
  return weight *1000 *1000 *1000 *1000 / ((width * 1000) * (density * 1000) * (thickness * 1000));
}

function calWeight(density, width, thickness,length){
  return ((width * 1000) * (density * 1000) * (thickness * 1000) * length)   / (1000 * 1000 *1000 * 1000);
}


module.exports ={
    calculate : calculate
}