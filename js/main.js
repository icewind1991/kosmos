$(function() {
  var dynamicPrompt = $('#dynamic-prompt-part');
  var fillInTextInterval = 100;
  var clearOutTextInterval = 100;
  var textRemainInterval = 2000;
  var availablePackages = [
    'mechjeb',
    'b9-aerospace',
    'interstellar',
    'kerbal-attachment-system',
    'remote-tech-2',
    'enhanced-navball',
    'kw-rocketry',
    'astronomers-visual-pack',
    'kerbal-engineer-redux',
    'firespitter',
    'infernal-robotics',
    'kerbal-alarm-clock'
  ];

  var fillInText = function(text, callback) {
    var charsToAdd = text.split('');

    var intervalId = setInterval(function() {
      var nextChar = charsToAdd.shift();

      if (nextChar) {
        dynamicPrompt.text(dynamicPrompt.text() + nextChar);
      } else {
        clearInterval(intervalId);
        callback();
      }
    }, fillInTextInterval);
  };

  var clearOutText = function(callback) {
    var intervalId = setInterval(function() {
      var text = dynamicPrompt.text();

      if (text.length > 0) {
        dynamicPrompt.text(text.substring(0, text.length - 1));
      } else {
        clearInterval(intervalId);
        callback();
      }
    }, clearOutTextInterval);
  };

  var showAvailablePackages = function(index) {
    var packageName = availablePackages[index % availablePackages.length];

    fillInText(packageName, function() {
      setTimeout(function() {
        clearOutText(function() {
          showAvailablePackages(index + 1);
        });
      }, textRemainInterval);
    });
  };

  if (dynamicPrompt.length > 0) {
    showAvailablePackages(0);
  }
});

$(function() {
  var setColumnsEqualHeight = function() {
    var columns = $('#awesome-because-row .pane.feature-pane');

    var heights = columns.map(function() {
      return $(this).height();
    });

    var maxHeight = Math.max.apply(null, heights);

    columns.each(function() {
      $(this).height(maxHeight);
    });
  };

  // sets the multiple feature columns to be of equal height
  if ($('#awesome-because-row').length) {
    console.log('hellooo');
    setColumnsEqualHeight();
  }
});

$(function() {
  $('.scroll').click(function(e) {
    e.preventDefault();

    var dest = 0;
    if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
    } else {
        dest = $(this.hash).offset().top;
    }
    //go to destination
    $('html,body').animate({
        scrollTop: dest
    }, 1000);

  });
});
