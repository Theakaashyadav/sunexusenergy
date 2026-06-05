const SHEET_NAME = "Products";
function doGet(e){ const action=e.parameter.action; if(action==="getProducts") return json(getRows()); return json({status:"success",message:"Sunexus Apps Script API running"}); }
function doPost(e){ const data=JSON.parse(e.postData.contents||"{}"); return json({status:"success",data:data}); }
function getRows(){ const sh=SpreadsheetApp.getActive().getSheetByName(SHEET_NAME); if(!sh)return []; const values=sh.getDataRange().getValues(); const h=values.shift(); return values.map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]]))); }
function json(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
