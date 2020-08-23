var express = require('express');
var router = express.Router();
var InputService=require('../services/service.input');
const axios = require("axios");
/* GET users listing. */
router.get('/', function(req, res, next) {
  var keyword = req.query.keyword;      //keywords
  var minprice = req.query.minprice;    //minprice
  var maxprice = req.query.maxprice;    //maxprice
  var condition1 = req.query.new;       //condition1
  var condition2 = req.query.used;      //condition2
  var condition3 = req.query.verygood;  //condition3
  var condition4 = req.query.good;        //condition4
  var condition5 = req.query.acceptable;  //condition5
  var return1 = req.query.return;         //return
  if(return1!=null){
    return1 = 'true';
  }else{
    return1 = 'false';
  }

  var free = req.query.free;              //free
  free = (free==null?'false':'true');
  var expedited = req.query.expedited;    //expedited
  var sortorder = req.query.sortby;    //sortby
  var url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=YiqunGan-yiqunapp-PRD-7c8ec878c-25856e07&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=100";
  url += "&keywords=" + keyword;
  if(sortorder == '1'){
    sortorder  =  'BestMatch';
  }else if(sortorder == '2'){
    sortorder = 'CurrentPriceHighest';
  }else if(sortorder == '3'){
    sortorder = 'PricePlusShippingHighest';

  }else if (sortorder  == '4') {
    sortorder = 'PricePlusShippingLowest';
  }
  url += "&sortOrder=" + sortorder;
  var index = 0;
  if(minprice=='null'){
    minprice='0';
  }
  if(maxprice=='null'){
    maxprice=String(Number.MAX_SAFE_INTEGER);
  }
  if(minprice!=''){
    url += subsetUrl(index, "MinPrice", minprice);
    url += "&itemFilter(" + index + ").paramName=Currency" + "&itemFilter(" + index + ").paramValue=USD" ;
    index++;
  }
  if(maxprice!=''){
    url += subsetUrl(index, "MaxPrice", maxprice);
    url += "&itemFilter(" + index + ").paramName=Currency" + "&itemFilter(" + index + ").paramValue=USD" ;
    index++;
  }
 
  url += subsetUrl(index, "ReturnsAcceptedOnly", return1);
  index++;
  
  
  url += subsetUrl(index, "FreeShippingOnly", free);
  index++;
  
  if(expedited!=null){
    url += subsetUrl(index, "ExpeditedShippingType", "Expedited");
    index++;
  }

  const cond = [1000, 3000, 4000, 5000, 6000];
  if(condition1 != "null" || 
     condition2 != "null" || 
     condition3 != "null" || 
     condition4 != "null" || 
     condition5 != "null"  ) {
    url += "&itemFilter(" + index + ").name=" + "Condition";
    var value_count= 0;
    var cond_values = [condition1, condition2, condition3, condition4, condition5];
    var i;
    for(i=1;i<cond_values.length;i++) {
      if(cond_values[i] != "null") {
        url += "&itemFilter(" + index + ").value(" + value_count + ")=" + cond[i];
        value_count++;
      }
    }
  } 
  console.log(url);
  const getData = async url => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      //console.log(data);
      
      obj_res = getRes(data);
      res.status(200).send(obj_res).end();
    } catch (error){
      console.log(error);
    }
  };
  getData(url);
 
});
function subsetUrl(index, name, value){
  return "&itemFilter(" + index + ").name=" + name + "&itemFilter(" + index + ").value=" + value;
}

function getRes(data){
  var items  = data.findItemsAdvancedResponse[0].searchResult[0].item;
  var count = data.findItemsAdvancedResponse[0].searchResult[0]['@count'];
  obj_res = [];
  for(var i = 0; i < count; i++){
    var item = {};
    try {
      item['title']=items[i]['title'][0];
      item['price']=items[i]['sellingStatus'][0]['convertedCurrentPrice'][0]['__value__']
      try{
          item['imageURL']=items[i]['galleryURL'][0]
          if(item['imageURL']=='https://thumbs1.ebaystatic.com/pict/04040_0.jpg'){
              item['imageURL']='https://csci571.com/hw/hw8/images/ebayDefault.png';
          }
          
      }catch(error){
          item['imageURL']='https://csci571.com/hw/hw8/images/ebayDefault.png';
      }  
      item['location']=items[i]['location'][0];
      item['currency']=items[i]['sellingStatus'][0]['convertedCurrentPrice'][0]['@currencyId']
      item['category']=items[i]['primaryCategory'][0]['categoryName'][0]
      item['productLink']=items[i]['viewItemURL'][0]
      item['condition']=items[i]['condition'][0]['conditionDisplayName'][0]
      item['shippingCost']=items[i]['shippingInfo'][0]['shippingServiceCost'][0]['__value__']
      item['acceptReturn']=items[i]['returnsAccepted'][0]
      item['expedited']=items[i]['shippingInfo'][0]['expeditedShipping'][0]
      item['shippingType']=items[i]['shippingInfo'][0]['shippingType'][0]
      item['shipToLocations']=items[i]['shippingInfo'][0]['shipToLocations'][0]
      item['oneDay']=items[i]['shippingInfo'][0]['oneDayShippingAvailable'][0]
      item['bestOffer']=items[i]['listingInfo'][0]['bestOfferEnabled'][0]
      item['buyItNowAvailable']=items[i]['listingInfo'][0]['buyItNowAvailable'][0]
      item['listingType']=items[i]['listingInfo'][0]['listingType'][0]
      item['gift']=items[i]['listingInfo'][0]['gift'][0]
      item['watchCount']=items[i]['listingInfo'][0]['watchCount'][0]
      obj_res.push(item);
  } catch (err) {   
      continue;        
  }
  }
  return obj_res;
}


module.exports = router;
