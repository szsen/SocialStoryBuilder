//
//  StoryImageViewController.swift
//  SocialStoryBuilder
//
//  Created by Sonia Sen on 11/12/15.
//  Copyright © 2015 Sonia Sen. All rights reserved.
//

import UIKit
import Parse

class StoryImageViewController: UIViewController, UIScrollViewDelegate {
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var textView: UITextView!
    @IBOutlet weak var pageControl: UIPageControl!
    @IBOutlet weak var captionLabel: UILabel!
    
    var pageImages: [UIImage] = []
    var pageCaptions: [String] = []
    var pageViews: [UIImageView?] = []
    
    var panels: JSON? // set by StoryCollectionView
    var studentName: String?
    var storyTitle: String?
    
    var startTime = NSDate.timeIntervalSinceReferenceDate()
    var currentPage = 0
    var timePerPanel = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationItem.title = storyTitle
        
        scrollView.delegate = self

        // 1
        
        //Go through the panels to get the images and the captions
        for panel in panels! {
            //Get the image from URL
            var currImage = UIImage(named: "teddyrec.jpg")

            print("panel:", panel.1)
            if let url = NSURL(string: panel.1["url"].stringValue) {
           // if let url = NSURL(string: "https:\/\/upload.wikimedia.org\/wikipedia\/commons/c/c9/Wash_your_hands.svg") THIS CRASHES
                if let data = NSData(contentsOfURL: url) {
                    currImage = UIImage(data: data)
                }
            }
            pageImages.append(currImage!)
            
            
            
            //Get caption
            let currCaption = panel.1["caption"].stringValue
            pageCaptions.append(currCaption)
            
        }
        
        let pageCount = pageImages.count
        
        // 2
        pageControl.currentPage = 0
        pageControl.numberOfPages = pageCount
        
        captionLabel.text = pageCaptions[0]
        
        // 3
        for _ in 0..<pageCount {
            pageViews.append(nil)
        }
        
        // 4
        let pagesScrollViewSize = scrollView.frame.size
        scrollView.contentSize = CGSize(width: pagesScrollViewSize.width * CGFloat(pageImages.count),
            height: pagesScrollViewSize.height)
        
        // 5
        loadVisiblePages()
    }
    
    override func viewWillDisappear(animated: Bool){
        super.viewWillDisappear(animated)
        print("about to disappear!")
        
        let currentTime = NSDate.timeIntervalSinceReferenceDate()
        let elapsedTime : NSTimeInterval = currentTime - startTime
        let seconds = elapsedTime
        
        timePerPanel[currentPage] += seconds
        
        //Saving time to Parse for practice
        /*
        let testObject = PFObject(className: "TestObject")
        testObject["foo"] = "bar"
        testObject.saveInBackgroundWithBlock { (success: Bool, error: NSError?) -> Void in
            print("Object has been saved.")
        }
        
        let studentTimeObject = PFObject(className: "StoryRead")
        studentTimeObject["student"] = studentName
        studentTimeObject["story"] = storyTitle
        
        studentTimeObject["panelTime1"] = timePerPanel[0]
        studentTimeObject["panelTime2"] = timePerPanel[1]
        studentTimeObject["panelTime3"] = timePerPanel[2]
        studentTimeObject["panelTime4"] = timePerPanel[3]
        studentTimeObject["panelTime5"] = timePerPanel[4]
        studentTimeObject["panelTime6"] = timePerPanel[5]
        
        let sum = timePerPanel.reduce(0, combine: +)
        studentTimeObject["totalTime"] = sum
        
        studentTimeObject.saveInBackgroundWithBlock {
            (success: Bool, error: NSError?) -> Void in
            print("student time object saved")
        } */
        
        //Writing to MongoDB database
        let request = NSMutableURLRequest(URL: NSURL(string: "http://localhost:3000/api/add-new-stats")!)
        request.HTTPMethod = "POST"
        //let postString = "id=13&name=Jack"+"hello"
        let sum = timePerPanel.reduce(0, combine: +)
        var postString = "student=" + studentName! + "&story=" + storyTitle!
        postString = postString + "&panel1Time=" + String(timePerPanel[0]) + "&panel2Time=" + String(timePerPanel[1])
        postString = postString + "&panel3Time=" + String(timePerPanel[2]) + "&panel4Time=" + String(timePerPanel[3])
        postString = postString + "&panel5Time=" + String(timePerPanel[4]) + "&panel6Time=" + String(timePerPanel[5])
        postString = postString + "&totalTime=" + String(sum)
        print(postString)

        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            
            if error != nil {
                print("error=\(error)")
                return
            }
            
            print("response = \(response)")
            
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("responseString = \(responseString)")
        }
        task.resume()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func loadPage(page: Int) {
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // 1
        if let pageView = pageViews[page] {
            // Do nothing. The view is already loaded.
        } else {
            // 2
            var frame = scrollView.bounds
            frame.origin.x = frame.size.width * CGFloat(page)
            frame.origin.y = 0.0
            print(frame.origin.y)
            
            // 3
            let newPageView = UIImageView(image: pageImages[page])
            newPageView.contentMode = .ScaleAspectFit
            newPageView.frame = frame
            scrollView.addSubview(newPageView)
            
            // 4
            pageViews[page] = newPageView
        }
    }
    
    func purgePage(page: Int) {
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // Remove a page from the scroll view and reset the container array
        if let pageView = pageViews[page] {
            pageView.removeFromSuperview()
            pageViews[page] = nil
        }
    }
    
    func loadVisiblePages() {
        // First, determine which page is currently visible
        let pageWidth = scrollView.frame.size.width
        let page = Int(floor((scrollView.contentOffset.x * 2.0 + pageWidth) / (pageWidth * 2.0)))
        
        // Update the page control
        pageControl.currentPage = page
        
        //Time update to see time spendage on each panel
        if (page != currentPage){
            let currentTime = NSDate.timeIntervalSinceReferenceDate()
            let elapsedTime : NSTimeInterval = currentTime - startTime
            let seconds = elapsedTime
            
            timePerPanel[currentPage] += seconds
            startTime = currentTime
            currentPage = page
        }
        
        captionLabel.text = pageCaptions[page]
        
        // Work out which pages you want to load
        let firstPage = page - 1
        let lastPage = page + 1
        
        // Purge anything before the first page
        for var index = 0; index < firstPage; ++index {
            purgePage(index)
        }
        
        // Load pages in our range
        for index in firstPage...lastPage {
            loadPage(index)
        }
        
        // Purge anything after the last page
        for var index = lastPage+1; index < pageImages.count; ++index {
            purgePage(index)
        }
    }
    
    func scrollViewDidScroll(scrollView: UIScrollView!) {
        // Load the pages that are now on screen
        loadVisiblePages()
        
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
