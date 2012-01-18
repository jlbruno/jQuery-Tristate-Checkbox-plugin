/**********************************************************************************
 **
 **              jQuery Tristate Checkbox Plugin
 **              version: 1.0
 **
 **              Dual licensed under the MIT and GPL licenses:
 **              http://www.opensource.org/licenses/mit-license.php
 **              http://www.gnu.org/licenses/gpl.html
 **
 **              author: Jeff Leombruno, ported to jQuery 1.4 by Todd Eichel
 **              creation date: 09.20.2011
 **              dependencies: jQuery v1.4 or higher
 **
 **              This file contains the functionality for implementing 3 state checkboxes.
 **              Inspired by:
 **                   http://code.google.com/p/jquery-tristate-checkbox/
 **                   http://css-tricks.com/13467-indeterminate-checkboxes/
 **
 **********************************************************************************/
 
(function($){
    $.fn.tristate = function(options){
    
        var config = {
			selector: $(this).selector,
			checked: null,
			container: null,
			siblings: null
        };
        var opts = $.extend(config, options);
        
        return this.each(function(){
            var obj = $(this);
			
            var triState = function() {
			
				var pub = {};
				
                pub.init = function(){
					$('input[type="checkbox"]', obj).change(function(e) {
						config.checked = $(this).attr("checked")
						config.container = $(this).parent()
						config.siblings = config.container.siblings();

						config.container.find('input[type="checkbox"]').attr({
							indeterminate: false,
							checked: config.checked
						});
						
						pub.checkSiblings(config.container);
					});
					// run checkSiblings for every checked checkbox when the page loads
					$('input[type=checkbox]:checked', obj).each( function() {
						pub.checkSiblings($(this).parent());
					});
                };
				
				pub.checkSiblings = function(el) {
					var parent = el.parent().parent();
					var all = true;

					el.siblings().each(function() {
						return all = ($(this).children('input[type="checkbox"]').attr("checked") === config.checked);
					});

					if (all && config.checked) {
						parent.children('input[type="checkbox"]').attr({
							indeterminate: false,
							checked: config.checked
						});
						pub.checkSiblings(parent);
					} else if (all && !config.checked) {
						parent.children('input[type="checkbox"]').attr("checked", config.checked);
						parent.children('input[type="checkbox"]').attr("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
						pub.checkSiblings(parent);
					} else {
						el.parents("li").children('input[type="checkbox"]').attr({
							indeterminate: true,
							checked: false
						});
					}
				};
				
				return pub;
                               
            }();
            
            triState.init();
			triState.checkSiblings(obj);
            
            
        });
    };
})(jQuery);

