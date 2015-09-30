//
//  ssbuilderTests.m
//  ssbuilderTests
//
//  Created by Ruiheng Wang on 9/23/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface ssbuilderTests : XCTestCase

@end

@implementation ssbuilderTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}


- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    
    
    /* Here is an Instruments Automation testing
     
     var target = UIATarget.localTarget();
     
     //Testing the receiving of the title
     var stringResult = target.frontMostApp().mainWindow().staticTexts()[0];
     if (! stringResult.isValid()) UIALogger.logFail("The Story Title was NOT received");
     else UIALogger.logPass("The Story Title was set and received!");
     
     //Testinf the receiving of the caption
     var stringResult = target.frontMostApp().mainWindow().staticTexts()[1];
     if (! stringResult.isValid()) UIALogger.logFail("The Story Caption was NOT received");
     else UIALogger.logPass("The Story Caption was set and received!");
     */
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
