const transToHyphen = str => str.replace(/([A-Z])/g, "_$1").toUpperCase();

const transToCamel = (str) => {
  return str.toLowerCase().replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  })
}

const decodeStr=(str)=>{
  return unescape((str+'').replace(/\\u/g, '%u'))
}
const convertUTCTimeToLocalTime= (UTCDateString)=> {
  if(!UTCDateString){
    return '';
  }
  function formatFunc(str) {    //格式化显示
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(UTCDateString);     //这步是关键
  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var dateStr = year+'-'+mon+'-'+day;
  return dateStr;
}
const transJsontoTableData = (originData) => {
  if(typeof originData=="string"){
    originData=JSON.parse(originData)
  }

  let tinyData = (tempData) => {
    return {
      ID: tempData['-id'],
      NAME: tempData['-taskName']||tempData['-name']||'',
      TYPE: tempData['-type']||'',
      X: tempData.mxCell?tempData.mxCell.mxGeometry['-x']:tempData.mxGeometry['-x'],
      Y: tempData.mxCell?tempData.mxCell.mxGeometry['-y']:tempData.mxGeometry['-y'],
      WIDTH: tempData.mxCell?tempData.mxCell.mxGeometry['-width']:tempData.mxGeometry['-width'],
      HEIGHT: tempData.mxCell?tempData.mxCell.mxGeometry['-height']:tempData.mxGeometry['-height'],
      FROM: [],
      TO: []
    }
  }
  let obj = originData.mxGraphModel.root;
  let nodeData = [];
  let lineData = [];
  let keys = Object.keys(obj);
  keys.map(key => {
    let tempData = obj[key];
    if (key == 'mxCell') {
      tempData.map(item => {
        if (item['-edge'] == '1') {
          lineData.push(item)
        }else if(item['-vertex'] == '1'){
          nodeData[item['-id']] = tinyData(item)
        }else if(item.mxCell&&item.mxCell['-vertex'] == '1'){
          nodeData[item['-id']] = tinyData(item)
        }
      })
    } else {
      if (Object.prototype.toString.call(tempData) == '[object Object]') {
        nodeData[tempData['-id']] = tinyData(tempData)
      } else if (Object.prototype.toString.call(tempData) == '[object Array]') {
        tempData.map(item => {
          nodeData[item['-id']] = tinyData(item)
        })
      }
    }
  })
  lineData.map(item => {
    nodeData[item['-source']]&&nodeData[item['-source']].TO.push(item['-target'])
    nodeData[item['-target']]&&nodeData[item['-target']].FROM.push(item['-source'])
  })
  return nodeData.filter(item => item.ID)
}
export {
  transToHyphen,transToCamel,convertUTCTimeToLocalTime,transJsontoTableData,decodeStr
}
