//
//  SocialStoryBuilderUITests.swift
//  SocialStoryBuilderUITests
//
//  Created by Sonia Sen on 12/8/15.
//  Copyright © 2015 Sonia Sen. All rights reserved.
//

import XCTest

class SocialStoryBuilderUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testShowStudentView() {
        XCUIApplication().launch()
        let cells = XCUIApplication().collectionViews.cells
        print ("cells: ", cells.count)
        XCTAssertEqual(cells.count, 4, "found instead: \(cells.debugDescription)")
    }
    
    func testSelectStudentShowStories() {
        // Use recording to get started writing UI tests.
        XCUIApplication().launch()
        XCUIApplication().collectionViews.staticTexts["Roger Chen"].tap()
        let cells = XCUIApplication().collectionViews.cells
        XCTAssertEqual(cells.count, 2, "found instead: \(cells.debugDescription)")
    }
    
    func testSelectStudentSelectStory() {
        
        let collectionViewsQuery = XCUIApplication().collectionViews
        collectionViewsQuery.staticTexts["Sonia Sen"].tap()
        collectionViewsQuery.staticTexts["Washing Hands"].tap()
        
    }
    
    func testTimer(){
        //Make sure timer value for at least slide 1 and totalTime is greater than 0
    }
    
}
