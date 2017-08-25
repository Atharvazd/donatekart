( function( $, document, window ) {
	
	$( document ).ready( function(){
		
		var topMenuHandler = function( ){
			var currentScrollPosition = $(window).scrollTop();
			if( 0 == currentScrollPosition ) {
				$("#header").removeClass("mini-menu");			
			} else {
				$("#header").addClass("mini-menu");
			}
		}
		
		$( window ).scroll( topMenuHandler );
		topMenuHandler();

		// Vertical centered modals
		// you can give custom class like this // var modalVerticalCenterClass = ".modal.modal-vcenter";
		var modalVerticalCenterClass = ".modal";
		function centerModals($element) {
		    var $modals;
		    if ($element.length) {
		        $modals = $element;
		    } else {
		        $modals = $(modalVerticalCenterClass + ':visible');
		    }
		    $modals.each( function(i) {
		        var $clone = $(this).clone().css('display', 'block').appendTo('body');
		        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
		        top = top > 0 ? top : 0;
		        $clone.remove();
		        $(this).find('.modal-content').css("margin-top", top);
		    });
		}
		$(modalVerticalCenterClass).on('show.bs.modal', function(e) {
		    centerModals($(this));
		});
		$(window).on('resize', centerModals);
		
		
	function Donut_chart(options) {
		
		this.settings = $.extend({
			element: options.element,
			percent: 100
		}, options);
		
		
		this.circle = this.settings.element.find('path');
		this.settings.stroke_width = parseInt(this.circle.css('stroke-width'));
		this.radius = (parseInt(this.settings.element.css('width'))-this.settings.stroke_width)/2;
		this.angle = -97.5; // Origin of the draw at the top of the circle
		this.i = Math.round(0.75*this.settings.percent);
		this.first = true;
		
		this.animate = function() {
			this.timer = setInterval(this.loop.bind(this), 10);
		};
		
		this.loop = function(data) {
			this.angle += 5;  
			this.angle %= 360;
			var radians = (this.angle/180) * Math.PI;
			var x = this.radius + this.settings.stroke_width/2 + Math.cos(radians) * this.radius;
			var y = this.radius + this.settings.stroke_width/2 + Math.sin(radians) * this.radius;
			if(this.first==true) {
				var d = this.circle.attr('d')+" M "+x+" "+y;
				this.first = false;
			}
			else {
				var d = this.circle.attr('d')+" L "+x+" "+y;
			}
			this.circle.attr('d', d);
			this.i--;
			
			if(this.i<=0) {
				clearInterval(this.timer);
			}
		}
	};

	$(function() {
		$('.donut-chart').each(function(index) {
			$(this).append('<svg preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" id="donutChartSVG'+index+'"><path d="M100,100" /></svg>');
			var p = new Donut_chart({element: $('#donutChartSVG'+index), percent: $(this).attr('data-percent')});
			p.animate();
		});
	});
	
	$('a.js-link-scroll').on('shown.bs.tab', function (e) {
	   $('#campaignTabs .active').removeClass('active');
	   $('a[href="'+$(this).attr('href')+'"]').parent().addClass('active');
		var that = this;
		$('html, body').animate({
			scrollTop: $('#single-campaign-details').offset().top
		}, 500);
	});
		
	
	});
	
	
	
	
	
  jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
	
	
	
})( jQuery, document, window );