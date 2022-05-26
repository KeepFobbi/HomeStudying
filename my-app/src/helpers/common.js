export default function convertDate(date){
    var d = new Date(date),
      dformat = [d.getFullYear(),
                  d.getMonth()+1,
                  d.getDate()].join('-')
                  +' '+
                [d.getHours(),
                 d.getMinutes(),
                 d.getSeconds()].join(':');
  
  return dformat
  }

  export function convertDateToYMD(date){
    var d = new Date(date),
      dformat = [d.getFullYear(),
                  d.getMonth()+1,
                  d.getDate()].join('-')
  
  return dformat
  }