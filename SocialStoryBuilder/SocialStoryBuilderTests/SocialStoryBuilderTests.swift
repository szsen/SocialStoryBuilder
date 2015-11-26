//
//  SocialStoryBuilderTests.swift
//  SocialStoryBuilderTests
//
//  Created by Sonia Sen on 11/17/15.
//  Copyright © 2015 Sonia Sen. All rights reserved.
//

import XCTest

class SocialStoryBuilderTests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
        XCTAssert(true, "pass")
    }
    
    func testJPGImagePerformanceExample() {
        // This is an example of a performance test case.
        self.measureBlock {
            // Put the code you want to measure the time of here.
            let studentURL = "http://vector-magz.com/wp-content/uploads/2013/09/fire-drill-clip-art-300x291.jpg"
            if let url = NSURL(string: studentURL) {
                if let data = NSData(contentsOfURL: url) {
                    let image = UIImage(data: data)
                }
            }
        }
    }
    
    func testPNGImagePerformanceExample() {
        // This is an example of a performance test case.
        self.measureBlock {
            // Put the code you want to measure the time of here.
            let studentURL = "http://www.lessonpix.com/drawings/lori/3947/150x150/Raise%2520Hand.png"
            if let url = NSURL(string: studentURL) {
                if let data = NSData(contentsOfURL: url) {
                    let image = UIImage(data: data)
                }
            }
        }
    }
    
    func testGIFImagePerformanceExample() {
        // This is an example of a performance test case.
        self.measureBlock {
            // Put the code you want to measure the time of here.
            let studentURL = "http://images.clipartpanda.com/computer-clipart-for-kids-82610_15845_0.gif"
            if let url = NSURL(string: studentURL) {
                if let data = NSData(contentsOfURL: url) {
                    let image = UIImage(data: data)
                }
            }
        }
    }
    
    func testNoFileTypeImagePerformanceExample() {
        // This is an example of a performance test case.
        self.measureBlock {
            // Put the code you want to measure the time of here.
            let studentURL = "http://placehold.it/320x150"
            if let url = NSURL(string: studentURL) {
                if let data = NSData(contentsOfURL: url) {
                    let image = UIImage(data: data)
                }
            }
        }
    }
    
    func testStoryRetrieval(){
        let studentName = "Roger Chen"
        
        let nameURL = studentName.stringByReplacingOccurrencesOfString(" ", withString: "%20")
        
        let studentStoryUrlString = "http://localhost:3000/api/student-story/".stringByAppendingString(nameURL)
        let studentStoryUrl = NSURL(string: studentStoryUrlString)
        
        let urlSession = NSURLSession.sharedSession()
        urlSession.dataTaskWithURL(studentStoryUrl!, completionHandler: { (data, response, error) -> Void in
            XCTAssertNotNil(data, "data should not be nil")
            XCTAssertNil(error, "error should be nil")
            
            if (data?.length > 0 && error == nil){
                dispatch_async(dispatch_get_main_queue()) {
                    
                    let jsonData = JSON(data: data!)
                    for story in jsonData{
                        //Make sure there is a story that is received
                        XCTAssertNotNil(story, "story should not be nil")
                    }
                }
                
            }
            else if (data?.length == 0 && error == nil){
                print("Empty response")
            }
            else if (error != nil){
                print("there was an error", error)
            }
        }).resume()
        
    }
    
    func testSixPanelsRetrieved(){
        let studentName = "Roger Chen"
        
        let nameURL = studentName.stringByReplacingOccurrencesOfString(" ", withString: "%20")
        
        let studentStoryUrlString = "http://localhost:3000/api/student-story/".stringByAppendingString(nameURL)
        let studentStoryUrl = NSURL(string: studentStoryUrlString)
        
        let urlSession = NSURLSession.sharedSession()
        urlSession.dataTaskWithURL(studentStoryUrl!, completionHandler: { (data, response, error) -> Void in
            XCTAssertNotNil(data, "data should not be nil")
            XCTAssertNil(error, "error should be nil")
            
            if (data?.length > 0 && error == nil){
                dispatch_async(dispatch_get_main_queue()) {
                    
                    let jsonData = JSON(data: data!)
                    for story in jsonData{
                        //Make sure there is a story that is received
                        XCTAssertNotNil(story, "story should not be nil")
                        XCTAssertEqual(story.1["panels"].count, 6)
                    }
                }
                
            }
            else if (data?.length == 0 && error == nil){
                print("Empty response")
            }
            else if (error != nil){
                print("there was an error", error)
            }
        }).resume()
        
    }
    
    
}
