var arrImageList =['http://www.krishnais.com/images/slide4.jpg',
'http://www.krishnais.com/images/slide2.jpg',
'http://www.krishnais.com/images/slide1.jpg',
'http://www.krishnais.com/images/slide3.jpg'],
$module;

test("initAndConfiguration",function(){
      
    var expectedCssProp = "url(" + arrImageList[0] + ")",transitionTestCounter =1,
    animationTime = 300,
    transitionTime = 2000;
      
    $module = $('<div></div>').imageSlideshow({
        imageList : arrImageList,
        animationTime : animationTime,
        transitionTime : transitionTime,
        loop: false
    });
     
    equal($module.find('.current-img').css('background-image'),expectedCssProp,"First background image upon init OK");
    stop();
    var testTransition = function(){
        //notify qunit we're to starting test so test context can be initalized
        start();
        expectedCssProp = "url(" + arrImageList[transitionTestCounter++] + ")";            
        equal($module.find('.current-img').css('background-image'),expectedCssProp,(transitionTestCounter-1) + " transition OK");
                    
        if(transitionTestCounter < arrImageList.length){
            //notify qunit test is finished
            stop();
            //on each successive execution after first wait for transitionTime + overhead (20ms) to test again
            setTimeout(testTransition, transitionTime + 20);
        } else {
            stop();
            setTimeout(function(){
                start();
                            
                //after last transition and loop set to false, we're expected to see last image in array as image shown
                expectedCssProp = "url(" + arrImageList[arrImageList.length - 1] + ")";     
                equal($module.find('.current-img').css('background-image'),expectedCssProp,"Loop false OK");                 
                                                    
            },transitionTime + 20);
        }
    };
    setTimeout(testTransition,animationTime + transitionTime + 20);               
}); 
            
          
          
test('moveAndEvents',function(){
    var eventFired = false,
    eventHandler = function(){
        eventFired = true;
    },
    expectedCssProp = "url(" + arrImageList[2] + ")"
            
    $module = $('<div></div>').imageSlideshow({
        imageList : arrImageList,
        animationTime : 300,
        transitionTime : 2000,
        loop: false,
        autoPlay: false
    });
     
    $module.bind('imageChanged',eventHandler);
                
    //display third image
    $module.imageSlideshow('displayImage',2);
                
    //test if third image shown
    equal($module.find('.current-img').css('background-image'),expectedCssProp,"displayImgae method OK");
                
    ok(eventFired, "imageChanged event fired OK");               
});


