Onloader.on(function() {
    window.onclick = function() {
        document.getElementById('input').focus();
    };
    document.getElementById('input').focus();
    document.getElementById('input').onkeyup = function(e) {
    // F5
        if (e.keyCode == 116) {
            location.reload();
        }
        
    // Ctrl + Z
        if (e.keyCode == 90 && e.ctrlKey) {
            alert('Ctrl + Z');
        }
        
    // Del
        if (e.keyCode == 46) {
            alert('Del');
        }
        
    // Вверх
        if (e.keyCode == 38) {
            alert('Вверх');
        }
        
    // Вниз
        if (e.keyCode == 40) {
            alert('Вниз');
        }
        
        return true;
    };
});