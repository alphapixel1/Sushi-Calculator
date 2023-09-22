//1 cup rice = 2 tbs vinegar, 2 tablespoons of sugar and 1 teaspoon of salt
class riceRatio{
    constructor(base,rice,vinegar,sugar,salt){
        this.base=base;
        this.rice=rice;
        this.vinegar=vinegar;
        this.sugar=sugar;
        this.salt=salt;
    }
}

const liquidRatio=new riceRatio("US Legal Cup",1,2/16,2/16,1/48);
//const metricRatio=new riceRatio("Milliliter",1,30,30,5)
// Conversion factors


function getLowestUnit(value,fromUnit,unitList){
    if(!unitList.includes(fromUnit)){
        value=convertVolume(value,fromUnit,unitList[0])
    }
    
    var results=[];
    for(var unit of unitList){
        results.push({
            "unit":unit,
            "value":(value*units[unit])
        });
    }
    //console.log(results);
    let lowest=null;
    for (const obj of results) {
        if (obj.value >= 1) {
            if (!lowest || obj.value < lowest.value) {
                lowest = obj;
            }   
        }
    }

    //console.log(lowest);
    if(lowest==null){
        for(const obj of results)
            if(!lowest || obj.value>lowest.value)
                lowest=obj;
        return lowest;
    }
    
    return lowest;
}

function convertVolume(value, fromUnit, toUnit) {
  //  console.log("convertVolume:",fromUnit,toUnit);
    if (units.hasOwnProperty(fromUnit) && units.hasOwnProperty(toUnit)) {
      const conversionFactor = units[toUnit] / units[fromUnit];
      return value * conversionFactor;
    } else {
      return "Invalid unit(s) provided.";
    }
}
function getUnitTexts(value,fromUnit){
    var ret=[]
    for(const unit of [usLegal,metic,imperial]){
        let v=getLowestUnit(value,fromUnit,unit);
        //console.log("UNITS",v,unit);
        if(v!=null)
            ret.push(`${Math.round(v.value*100)/100} ${v.unit}`)
    }
    console.log("getUnitTexts",ret);
    return ret.join("<br>");
}

const units = {
    "US Legal Cup": 1,
    /*"US Fluid Ounce": 8,*/
    "US Tablespoon": 16,
    "US Teaspoon": 48,

    "Liter": 0.2365882365, // Approximate conversion
    "Milliliter": 236.5882365, // Approximate conversion

    "Imperial Cup": 0.8326741846, // Approximate conversion
    /*"Imperial Fluid Ounce": 8.7990411266, // Approximate conversion*/
    "Imperial Tablespoon": 17.7580822533, // Approximate conversion
    "Imperial Teaspoon": 53.27424676, // Approximate conversion
};
const usLegal=["US Legal Cup",/*"US Fluid Ounce",*/"US Tablespoon","US Teaspoon"];
const metic=["Liter","Milliliter"];
const imperial=["Imperial Cup"/*"Imperial Fluid Ounce"*/,"Imperial Tablespoon","Imperial Teaspoon"];
window.onload=function(){
    console.log("loaded")
    let calculateBtn=document.querySelector("#calculate-btn");
    let riceInput=document.querySelector("#rice-input");
    let unitSelect=document.querySelector("#unit-select");
    let saltText=document.querySelector("#saltText");
    let sugarText=document.querySelector("#sugarText");
    let vinegarText=document.querySelector("#vinegarText");
    console.log(calculateBtn)
   

    calculateBtn.onclick=function(){
        console.log("click");
        var value=riceInput.value;
        //alert(a);
        let unit=unitSelect.value;
        
        let usLegalCupValue=convertVolume(value,unit,"US Legal Cup");
        console.log("US Legal Cup",usLegalCupValue);
        let ratio=usLegalCupValue*liquidRatio.rice;
        console.log("ratio",ratio);
        let salt=ratio*liquidRatio.salt;
        console.log("salt",salt);
        let sugar=ratio*liquidRatio.sugar;
        console.log("sugar",sugar);
        let vinegar=ratio*liquidRatio.vinegar;
        console.log("vinegar",vinegar);

        saltText.innerHTML=getUnitTexts(salt,"US Legal Cup");
        sugarText.innerHTML=getUnitTexts(sugar,"US Legal Cup");
        vinegarText.innerHTML=getUnitTexts(vinegar,"US Legal Cup");

    }
}