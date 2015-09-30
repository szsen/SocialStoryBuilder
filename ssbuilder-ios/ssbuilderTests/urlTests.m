//
//  urlTests.m
//  ssbuilder
//
//  Created by Sonia Sen on 9/30/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface urlTests : XCTestCase

@end

@implementation urlTests

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
    NSString *myUrlString = @"http://localhost:3000/api/stories";
    //create a NSURL object from the string data
    NSURL *myUrl = [NSURL URLWithString:myUrlString];
    
    NSURLSession *urlSession = [NSURLSession sharedSession];
    [[urlSession dataTaskWithURL:myUrl completionHandler:^(NSData *data, NSURLResponse *response,NSError *error) {
        if ([data length] >0 && error == nil){
            //process the JSON response
            //use the main queue so that we can interact with the screen
            dispatch_async(dispatch_get_main_queue(), ^{
                NSString *myData = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                NSLog(@"JSON data = %@", myData);
                NSError *error = nil;
                //parsing the Json response
                NSDictionary *jsonObject =[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
                if(jsonObject != nil &&error ==nil){
                    NSLog(@"successfully deserialized...");
                }
                
                XCTAssertEqualObjects([jsonObject objectForKey:@"title"], @"Hello");
                XCTAssertEqualObjects([jsonObject objectForKey:@"caption"], @"Hi");
            });
        }
        else if ([data length] == 0 && error == nil){
            XCTAssertFalse(@"nothing was returned");
        }
        else if (error != nil){
            XCTAssertFalse(@"an error occurred");
        }
    }]resume];
    
    
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
