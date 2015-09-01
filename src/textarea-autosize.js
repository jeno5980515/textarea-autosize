var AutoSize = (function(){ 

	var self = {} ;

	self.resize = function(element){
		if ( element[0] === "#" ){
			var text = document.getElementById(element.substring(1));
			setTextEvent(text) ;
		} else if ( element[0] === "." ){
			var texts = document.getElementsByClassName(element.substring(1));
			for ( var i = 0 ; i < texts.length ; i ++ ){
				setTextEvent(texts[i]) ;
			}
		}
	}

	var setTextEvent = function(text){
		text.onkeydown = function(){
			var result = getTextMaxLength(text,getFontFamily(this),getFontSize(this)) ;
			this.style.width = result.length  + 3 ;
			this.style.height = getTextHeight(getFontFamily(this),getFontSize(this)) * result.row + 10;
		}
		text.onkeyup = function(){
			var result = getTextMaxLength(text,getFontFamily(this),getFontSize(this)) ;
			this.style.width = result.length  + 3 ;
			this.style.height = getTextHeight(getFontFamily(this),getFontSize(this)) * result.row + 10;
		}
	}

	var getFontSize = function(text){
		var style = window.getComputedStyle(text, null).getPropertyValue('font-size');
		var fontSize = parseFloat(style); 
		return fontSize ;
	}

	var getFontFamily = function(text){
		return window.getComputedStyle( text, null ).getPropertyValue( 'font-family' );
	}

	var getTextWidth = function(text,font,size){
		var span = document.createElement('span');
		span.style['fontFamily'] = font ;
		span.style['fontSize'] = size ;
		span.innerHTML = "W" + text  + "W";
		document.body.appendChild(span);
		var width = 0 ;
		try {
			width = span.offsetWidth ;
		} finally {
			span.remove();
		}
		return width;
	}

	var getTextHeight = function(font,size) {
		var text = document.createElement('span');
		text.style['fontFamily'] = font ;
		text.style['fontSize'] = size ;
		text.innerHTML = "Hg";
		var block = document.createElement('div') ;
		block.style.display ="inline-block";
		block.style.width = "1px" ;
		block.style.height = "0px" ; 
		var div = document.createElement('div');
		div.appendChild(text);
		div.appendChild(block)
		document.body.appendChild(div);
		var height = 0 ;
		try {
			block.style.verticalAlign = "bottom" ;
			height = block.offsetTop - text.offsetTop;
		} finally {
			div.remove();
		}
		return height;
	}

	var getTextMaxLength = function(text,font,size){
		var s = "" ;
		var t = text.value ;
		var max = 0 ;
		var row = 0 ;
		for ( var i = 0 ; i < t.length ; i ++ ){
			if ( t[i] === "\n" || i === t.length - 1 ){
				max = Math.max(max,getTextWidth(s,font,size)) ;
				s = "" ;
				row ++ ;
				if ( (t[i] === "\n" || t[i] === "\r" || t[i] === "\r\n"  ) && i === t.length - 1 ){
					row++ ;
				}
			} else {
				s += t[i] ;
			}
		}
		return {row:row,length:max} ;
	}

	return self ;
})();
