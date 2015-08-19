define([], function() {
    return {
        create : function(data, clickHandler) {
            var fragment = document.createDocumentFragment();
            var column = document.createElement("div");
            column.setAttribute("class", "box");
            
            data.forEach(function(info) {
                var valueEntry = document.createElement("a");
                valueEntry.setAttribute("href", "#");
                valueEntry.innerHTML = info.label;
                
                if (clickHandler) {
                    valueEntry.onclick = clickHandler;
                }

                if (info.dataAttributes) {
                    for (var attribute in info.dataAttributes) {
                        if (info.dataAttributes.hasOwnProperty(attribute) && info.dataAttributes[attribute]) {
                            valueEntry.setAttribute(attribute, info.dataAttributes[attribute]);
                        }
                    }
                }
                    
                var valueNode = document.createElement("span");
                valueNode.setAttribute("class", "entry");                
                valueNode.appendChild(valueEntry);
                
                fragment.appendChild(valueNode);
            });

            column.appendChild(fragment);
            return column;
        }
    };
});
