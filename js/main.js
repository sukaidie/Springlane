window.onload=function(){

  var form=document.getElementById('form');
  var inputK=document.getElementById('inputKey');
  var inputV=document.getElementById('inputValue');
  var btnSubmit=document.getElementById('btnSubmit');
  var list=document.getElementById('list');
  var id=1;
  var arr=[],obj;
  var sortedArr=[];
  var recordInputK=[];

  btnSubmit.addEventListener("click",addToList);

  function addToList(){
    if (inputK.value===""||inputV.value==="") {
      alert("You must enter some value!");
    }
    else if (recordInputK.includes(inputK.value)) {
      alert("Please enter a new Key!");
    }
    else {
      obj = {"id":id, "ik":inputK.value, "iv":inputV.value};
      arr.push(obj);
      var textKey=inputK.value;
      recordInputK.push(textKey);
      var textValue=inputV.value;
      var item=`<li class="item-${id}" id="li-${id}">
                  <input id="outputKey" name="" value="${textKey}" readonly>
                  <input id="outputValue" name="" value="${textValue}">
                  <button type="button" class="btnUpdate">Update</button>
                  <button type="button" class="btnRemove">Remove</button>
                </li>`;
      list.insertAdjacentHTML('beforeend',item);
      id++;
      addToLocalStorage(textKey,textValue);
      form.reset();
    }
  }

  function searchArr(nameKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].ik === nameKey) {
              return true;
          }
      }
  }

  function changeArr( findByIk, newIV ) {
     for (var i in arr) {
       if (arr[i].ik == findByIk) {
          arr[i].iv = newIV;
          break; //Stop this loop, we found it!
       }
     }
  }

  function addToLocalStorage(key,value){
    if (typeof(Storage)!=="undefined") {
      localStorage.setItem(key,value);
    }
    else {
      alert("Sorry, your browser doesn't support local storage!")
    }
  }

  function compareSecondColumn(a, b) {
      if (a.ik === b.ik) {
          return 0;
      }
      else {
          return (a.ik > b.ik) ? -1 : 1;
      }
  }

  function compareSecondColumn2(a, b) {
      if (a.ik === b.ik) {
          return 0;
      }
      else {
          return (a.ik < b.ik) ? -1 : 1;
      }
  }

  function updateArr() {
    arr.splice(arr.findIndex(function(i){
        return i.ik === $(this).parent().find('#outputKey').val();
    }), 1);
  }

// ************************* button Sort Z to A ********************************* //
  $( document ).on("click" , "#btnSort" , function() {
    console.log("Sorting the data in reverse-alphabetical...");
    $( "#list" ).empty();
    sortedArr=arr.sort(compareSecondColumn);
    var newItem;
    for (var i = 0; i < sortedArr.length; i++) {
      newItem=`<li class="item-${sortedArr[i].id}" id="li-${sortedArr[i].id}">
                  <input id="outputKey" name="" value="${sortedArr[i].ik}" readonly>
                  <input id="outputValue" name="" value="${sortedArr[i].iv}">
                  <button type="button" class="btnUpdate">Update</button>
                  <button type="button" class="btnRemove">Remove</button>
                </li>`;
      list.insertAdjacentHTML('beforeend',newItem);
      id++;
    }
  });

// ************************* button Sort A to Z ********************************* //
  $( document ).on("click" , "#btnSort-2" , function() {
    console.log("Sorting the data in alphabetical...");
    $( "#list" ).empty();
    sortedArr=arr.sort(compareSecondColumn2);
    var newItem;
    for (var i = 0; i < sortedArr.length; i++) {
      newItem=`<li class="item-${sortedArr[i].id}" id="li-${sortedArr[i].id}">
                  <input id="outputKey" name="" value="${sortedArr[i].ik}" readonly>
                  <input id="outputValue" name="" value="${sortedArr[i].iv}">
                  <button type="button" class="btnUpdate">Update</button>
                  <button type="button" class="btnRemove">Remove</button>
                </li>`;
      list.insertAdjacentHTML('beforeend',newItem);
      id++;
    }
  });

// ************************* button UPDATE ********************************* //
  $( document ).on("click" , ".btnUpdate" , function() {
    console.log("Button UPDATE was clicked.");
    localStorage.setItem($(this).parent().find('#outputKey').val(),$(this).parent().find('#outputValue').val());
    changeArr($(this).parent().find('#outputKey').val(),$(this).parent().find('#outputValue').val())
  });

// ************************* button REMOVE ********************************* //
  $( document ).on("click" , ".btnRemove" , function() {
    console.log("Button REMOVE was geclicked.");
    $(this).parent('li').remove();
    var itemByKey=$(this).parent().find('#outputKey').val()
    localStorage.removeItem(itemByKey);

    if (searchArr(itemByKey, arr)==true) {
      arr.splice(arr.findIndex(function(i){
          return i.ik === itemByKey;
      }), 1);
    }
  });
}
