function showDialog(nodeId, showHide) {
    console.log('nodeId='+nodeId+' showHide='+showHide);
    function show(nodeId, showHide) {
        let elem = document.getElementById(nodeId);
        if (showHide) {
            elem.style.display = "flex";
        } else {
            elem.style.display = "none";
        }
    }
    show(nodeId+'_shadow',showHide);
    show(nodeId,showHide);
    return false;
}
export default showDialog;